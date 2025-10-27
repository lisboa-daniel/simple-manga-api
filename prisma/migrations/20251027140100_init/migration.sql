-- CreateTable
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "synopsis" TEXT,
    "status" TEXT NOT NULL,
    "tags" TEXT[],
    "demographic" TEXT NOT NULL,
    "serialization" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Read" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "titleId" INTEGER NOT NULL,
    "chaptersRead" INTEGER NOT NULL,
    "volumesRead" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkEntry" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "titleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarkEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_title_key" ON "Manga"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Read_userId_titleId_key" ON "Read"("userId", "titleId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_name_key" ON "Bookmark"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "BookmarkEntry_listId_titleId_key" ON "BookmarkEntry"("listId", "titleId");

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkEntry" ADD CONSTRAINT "BookmarkEntry_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Bookmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkEntry" ADD CONSTRAINT "BookmarkEntry_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
