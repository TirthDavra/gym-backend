import prisma from "../lib/prisma.js";

export const getDashboardStatsService =
  async () => {
    const today = new Date();

    // TOTAL MEMBERS
    const totalMembers =
      await prisma.member.count();

    // ACTIVE MEMBERS
    const activeMembers =
      await prisma.subscription.count({
        where: {
          endDate: {
            gte: today,
          },
        },
      });

    // EXPIRED MEMBERS
    const expiredMembers =
      await prisma.subscription.count({
        where: {
          endDate: {
            lt: today,
          },
        },
      });

    return {
      totalMembers,
      activeMembers,
      expiredMembers,
    };
  };