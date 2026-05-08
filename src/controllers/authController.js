import { loginService } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};