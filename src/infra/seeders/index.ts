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

    const instructorsData = [
      { name: "John Doe", email: "john.doe@example.com" },
      { name: "Jane Smith", email: "jane.smith@example.com" },
      { name: "Alice Johnson", email: "alice.johnson@example.com" },
    ];

    const instructors = await Promise.all(
      instructorsData.map((instructor) =>
        prisma.instructor.upsert({
          where: { email: instructor.email },
          update: {},
          create: instructor,
        }),
      ),
    );

    logger.info({ msg: "Instructors seeded successfully!" });

    const coursesData = [
      {
        title: "Introduction to Node.js",
        description: "Learn the basics of Node.js",
        duration: 100,
        instructorId: instructors[0].id,
      },
      {
        title: "Advanced React",
        description: "Master React and its ecosystem",
        duration: 150,
        instructorId: instructors[1].id,
      },
      {
        title: "Introduction to Node.js 2",
        description: "Learn the basics of Node.js",
        duration: 120,
        instructorId: instructors[2].id,
      },
      {
        title: "Advanced React 2",
        description: "Master React and its ecosystem",
        duration: 80,
        instructorId: instructors[0].id,
      },
    ];

    await Promise.all(
      coursesData.map((course) =>
        prisma.course.create({
          data: course,
        }),
      ),
    );

    logger.info({ msg: "Courses seeded successfully!" });
  } catch (error) {
    logger.error({ msg: "Error seeding data:", error });
  } finally {
    await prisma.$disconnect();
  }
}

main();
