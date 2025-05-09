import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (
      [name, email, password].some(
        (ele) => !ele || typeof ele !== "string" || !ele.trim()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }

    const isExitingUser = await db.user.findUnique({
      where: { email },
    });

    if (isExitingUser) {
      return res.status(401).json({
        success: false,
        message: "Email is Already registed",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await db.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        role: UserRole.USER,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User Registed Successfully",
      data: createUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      [email, password].some(
        (ele) => !ele || typeof ele !== "string" || !ele.trim()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }

    const isExitingUser = await db.user.findUnique({
      where: { email },
    });

    if (!isExitingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const comparePassword = await bcrypt.compare(
      password,
      isExitingUser.password
    );

    if (!comparePassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = await jwt.sign(
      {
        id: isExitingUser.id,
        email: isExitingUser.email,
        name: isExitingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({
        success: true,
        message: "User Login Successfully",
        data: {
          id: isExitingUser.id,
          email: isExitingUser.email,
          name: isExitingUser.name,
          image: isExitingUser.imageUrl,
          role: isExitingUser.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const getme = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        name: true,
        imageUrl: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: false,
      message: "Get User Details",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export { register, login, logout, getme };
