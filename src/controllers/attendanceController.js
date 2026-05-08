import { checkInService } from "../services/attendanceService.js";

export const checkIn = async (
  req,
  res
) => {
  try {
    const result = await checkInService(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};