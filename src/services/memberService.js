import prisma from "../lib/prisma.js";

export const createMemberService = async (data) => {
  const { fullName, email, phone } = data;

  if (!fullName || !email || !phone) {
    throw new Error("All fields are required");
  }

  // EMAIL VALIDATION
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // PHONE VALIDATION
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error(
      "Phone number must be 10 digits"
    );
  }

  // CHECK DUPLICATE EMAIL
  const existingEmail =
    await prisma.member.findUnique({
      where: {
        email,
      },
    });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // CHECK DUPLICATE PHONE
  const existingPhone =
    await prisma.member.findUnique({
      where: {
        phone,
      },
    });

  if (existingPhone) {
    throw new Error("Phone already exists");
  }

  // CREATE MEMBER
  const member = await prisma.member.create({
    data: {
      fullName,
      email,
      phone,
    },
  });

  return member;
};