import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: "admin@gmail.com",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
      },
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Admin seed failed");
    console.error(error.message);
  }
};

export default seedAdmin;