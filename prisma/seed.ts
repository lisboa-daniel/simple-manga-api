import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {

  try {
    const data = JSON.parse(fs.readFileSync('./Manga.json', 'utf-8'));

    for (const manga of data) {
      const created = await prisma.manga.upsert({
        where: { title: manga.title },
        update: {},
        create: {
          title: manga.title,
          author: manga.author,
          synopsis: manga.synopsis,
          status: manga.status,
          tags: manga.tags,
          demographic: manga.demographic,
          serialization: manga.serialization,
          picture: manga.picture,
          ISBN: manga.ISBN,
        },
      });
      console.log(`Seeded: ${created.title}`);
    }


   const userData = JSON.parse(fs.readFileSync('./User.json', 'utf-8'));

    for (const user of userData) {
      const created = await prisma.user.upsert({
        where: { name: user.name},
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: user.password
        },
      });
      console.log(`Seeded: ${created.name}`);
    }
  

  } catch (err){
    throw err;
  }

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
