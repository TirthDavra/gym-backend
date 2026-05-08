import {
  getDashboardStatsService,
} from "../services/dashboardService.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const result =
        await getDashboardStatsService();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };