import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  try {
    // 🌸 Seed Manga
    const mangaData = JSON.parse(fs.readFileSync('./Manga.json', 'utf-8'));
    for (const manga of mangaData) {
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
      console.log(`Seeded Manga: ${created.title}`);
    }


    interface userProps {
      id: string;
      createdAt: Date;
      name: string;
      email: string;
      password: string;
    }
    let savedUser : userProps | undefined = undefined;

    // 🌸 Seed User
    const userData = JSON.parse(fs.readFileSync('./User.json', 'utf-8'));
    for (const user of userData) {
      const created = await prisma.user.upsert({
        where: { name: user.name },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

      savedUser = created;
      console.log(`Seeded User: ${created.name}`);
    }



    // 🌸 Seed Read
    if (fs.existsSync('./Read.json') && savedUser != undefined) {
      const readData = JSON.parse(fs.readFileSync('./Read.json', 'utf-8'));
      for (const read of readData) {
        const created = await prisma.read.upsert({
          where: {
            userId_titleId: {
              userId: savedUser.id,
              titleId: read.titleId,
            },
          },
          update: {
            chaptersRead: read.chaptersRead,
            volumesRead: read.volumesRead,
          },
          create: {
            userId: savedUser.id,
            titleId: read.titleId,
            chaptersRead: read.chaptersRead,
            volumesRead: read.volumesRead,
          },
        });
        console.log(
          `Seeded Read for User: ${created.userId} → Manga: ${created.titleId}`
        );
      }
    }

    // 🌸 Seed Bookmark
    if (fs.existsSync('./Bookmark.json') && savedUser) {
      const bookmarkData = JSON.parse(fs.readFileSync('./Bookmark.json', 'utf-8'));
      for (const bookmark of bookmarkData) {
        const created = await prisma.bookmark.upsert({
          where: {
            userId_name: {
              userId: savedUser.id,
              name: bookmark.name,
            },
          },
          update: {},
          create: {
            userId: savedUser.id,
            name: bookmark.name,
          },
        });
        
        console.log(`Seeded Bookmark List: ${created.name}`);
      }
    }

    // 🌸 Seed BookmarkEntry
    if (fs.existsSync('./Bookmarkentry.json')) {
      const entryData = JSON.parse(fs.readFileSync('./Bookmarkentry.json', 'utf-8'));
      for (const entry of entryData) {
        const created = await prisma.bookmarkEntry.upsert({
          where: {
            listId_titleId: {
              listId: entry.listId,
              titleId: entry.titleId,
            },
          },
          update: {},
          create: {
            listId: entry.listId,
            titleId: entry.titleId,
          },
        });
        console.log(
          `Seeded BookmarkEntry → List: ${created.listId} | Manga: ${created.titleId}`
        );
      }
    }

    console.log('✨ All seeds done successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err);
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
