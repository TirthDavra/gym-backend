import prisma from "../lib/prisma.js";

export const assignSubscriptionService =
    async (data) => {
        const {
            memberId,
            planName,
            startDate,
            endDate,
        } = data;

        if (
            !memberId ||
            !planName ||
            !startDate ||
            !endDate
        ) {
            throw new Error(
                "All fields are required"
            );
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

        const today = new Date();

        const existingActiveSubscription =
            await prisma.subscription.findFirst({
                where: {
                    memberId: Number(memberId),
                    endDate: {
                        gte: today,
                    },
                },
            });

        if (existingActiveSubscription) {
            throw new Error(
                "Member already has an active subscription"
            );
        }

        // DATE VALIDATION
        if (
            new Date(endDate) <=
            new Date(startDate)
        ) {
            throw new Error(
                "End date must be greater than start date"
            );
        }

        // CREATE SUBSCRIPTION
        const subscription =
            await prisma.subscription.create({
                data: {
                    memberId: Number(memberId),
                    planName,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                },
            });

        return subscription;
    };

export const getActiveMembersService =
    async () => {
        const today = new Date();

        const activeMembers =
            await prisma.subscription.findMany({
                where: {
                    endDate: {
                        gte: today,
                    },
                },
                include: {
                    member: true,
                },
            });

        return activeMembers;
    };

export const getExpiredMembersService =
    async () => {
        const today = new Date();

        const expiredMembers =
            await prisma.subscription.findMany({
                where: {
                    endDate: {
                        lt: today,
                    },
                },
                include: {
                    member: true,
                },
            });

        return expiredMembers;
    };