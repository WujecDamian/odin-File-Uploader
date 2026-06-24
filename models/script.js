import { prisma } from "../lib/prisma.js";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      fullname: "John Wick",
      email: "jooohnieWick@gmail.com",
      username: "jwick",
      password: "12345678",
      folders: {
        create: {
          folder_name: "Hello World",
          files: {
            create: {
              filename: "Dog1.jpg",
              file_url:
                "https://www.goodhousekeeping.com/life/pets/g4531/cutest-dog-breeds/",
              file_size: "1.6MB",
            },
          },
        },
      },
    },
    include: {
      folders: {
        include: {
          files: true,
        },
      },
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      folders: {
        include: {
          files,
        },
      },
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
