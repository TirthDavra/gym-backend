import { createMemberService } from "../services/memberService.js";

export const createMember = async (req, res) => {
  try {
    const member = await createMemberService(req.body);

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};