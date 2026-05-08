import { createMemberService, deleteMemberService, getMembersService, updateMemberService } from "../services/memberService.js";

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


export const getMembers = async (req, res) => {
  try {
    const result = await getMembersService(
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateMember = async (
  req,
  res
) => {
  try {
    const result = await updateMemberService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteMember = async (
  req,
  res
) => {
  try {
    const result = await deleteMemberService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};