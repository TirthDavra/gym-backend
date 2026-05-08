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



export const getMembersService = async (
  query
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  // TOTAL MEMBERS COUNT
  const totalMembers =
    await prisma.member.count();

  // FETCH MEMBERS
  const members = await prisma.member.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // TOTAL PAGES
  const totalPages = Math.ceil(
    totalMembers / limit
  );

  return {
    data: members,
    pagination: {
      totalMembers,
      totalPages,
      currentPage: page,
      limit,
    },
  };
};


export const updateMemberService = async (
  id,
  data
) => {
  const memberId = Number(id);

  const { fullName, email, phone } = data;

  // CHECK MEMBER EXISTS
  const existingMember =
    await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

  if (!existingMember) {
    throw new Error("Member not found");
  }

  // EMAIL VALIDATION
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // PHONE VALIDATION
  const phoneRegex = /^[0-9]{10}$/;

  if (phone && !phoneRegex.test(phone)) {
    throw new Error(
      "Phone number must be 10 digits"
    );
  }

  // CHECK DUPLICATE EMAIL
  if (email) {
    const emailExists =
      await prisma.member.findFirst({
        where: {
          email,
          NOT: {
            id: memberId,
          },
        },
      });

    if (emailExists) {
      throw new Error("Email already exists");
    }
  }

  // CHECK DUPLICATE PHONE
  if (phone) {
    const phoneExists =
      await prisma.member.findFirst({
        where: {
          phone,
          NOT: {
            id: memberId,
          },
        },
      });

    if (phoneExists) {
      throw new Error("Phone already exists");
    }
  }

  // UPDATE MEMBER
  const updatedMember =
    await prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        fullName,
        email,
        phone,
      },
    });

  return updatedMember;
};



export const deleteMemberService = async (
  id
) => {
  const memberId = Number(id);

  // CHECK MEMBER EXISTS
  const existingMember =
    await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

  if (!existingMember) {
    throw new Error("Member not found");
  }

  // DELETE MEMBER
  await prisma.member.delete({
    where: {
      id: memberId,
    },
  });

  return "Member deleted successfully";
};