import {
  assignSubscriptionService,
  getActiveMembersService,
  getExpiredMembersService,
} from "../services/subscriptionService.js";

export const assignSubscription = async (
  req,
  res
) => {
  try {
    const result =
      await assignSubscriptionService(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Subscription assigned successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getActiveMembers = async (
  req,
  res
) => {
  try {
    const result =
      await getActiveMembersService();

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

export const getExpiredMembers = async (
  req,
  res
) => {
  try {
    const result =
      await getExpiredMembersService();

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