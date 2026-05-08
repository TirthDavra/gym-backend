import prisma from "../lib/prisma.js";

export const checkInService = async (
  data
) => {
  const { memberId } = data;

  if (!memberId) {
    throw new Error("Member ID is required");
  }

  // CHECK MEMBER EXISTS
  const member =
    await prisma.member.findUnique({
      where: {
        id: Number(memberId),
      },
    });

  if (!member) {
    throw new Error("Member not found");
  }

  // TODAY DATE
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // CHECK EXISTING ATTENDANCE
  const existingAttendance =
    await prisma.attendance.findFirst({
      where: {
        memberId: Number(memberId),
        checkInDate: today,
      },
    });

  if (existingAttendance) {
    throw new Error(
      "Member already checked in today"
    );
  }

  // CREATE ATTENDANCE
  const attendance =
    await prisma.attendance.create({
      data: {
        memberId: Number(memberId),
        checkInDate: today,
      },
    });

  return attendance;
};