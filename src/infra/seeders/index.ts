import { PrismaClient } from "@prisma/client";
import { SecurityService } from "@/shared/securityService";
import { Logger } from "@/shared/logger";
const logger = Logger.getInstance();

const prisma = new PrismaClient();

async function main() {
  try {
    const adminEmail = "admin@admin.com";
    const adminPassword = "admin123";

    const securityService = new SecurityService();
    const hashedPassword = await securityService.hashPassword(adminPassword);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: hashedPassword,
      },
    });

    logger.info({ msg: "Admin user seeded successfully!" });

    const instructors = [
      { name: "John Doe", email: "john.doe@example.com" },
      { name: "Jane Smith", email: "jane.smith@example.com" },
      { name: "Alice Johnson", email: "alice.johnson@example.com" },
    ];

    for (const instructor of instructors) {
      await prisma.instructor.upsert({
        where: { email: instructor.email },
        update: {},
        create: instructor,
      });
    }

    logger.info({ msg: "Instructors seeded successfully!" });
  } catch (error) {
    logger.error({ msg: "Error seeding admin user:", error });
  } finally {
    await prisma.$disconnect();
  }
}

main();
