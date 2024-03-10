/*
  Warnings:

  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Manager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `partnerName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Profession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Other` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `managerId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacanciesId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countPartners` to the `Profession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Profession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `needCandidate` to the `Profession` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Profession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_partnerName_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "managerId" TEXT NOT NULL,
ADD COLUMN     "vacanciesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
ADD COLUMN     "documentFile" TEXT,
ADD COLUMN     "documentImage" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Document_id_seq";

-- AlterTable
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_pkey",
ADD COLUMN     "managerImage" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Manager_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Manager_id_seq";

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "partnerImage" TEXT,
ALTER COLUMN "managerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "content",
DROP COLUMN "partnerName",
DROP COLUMN "published",
ADD COLUMN     "body" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "Profession" DROP CONSTRAINT "Profession_pkey",
ADD COLUMN     "countPartners" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "needCandidate" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "Profession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profession_id_seq";

-- DropTable
DROP TABLE "Other";

-- CreateTable
CREATE TABLE "Vacancies" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(255) NOT NULL,
    "price" TEXT NOT NULL,
    "homePrice" TEXT NOT NULL,
    "transport" TEXT NOT NULL,
    "partnerName" TEXT,
    "content" TEXT NOT NULL,
    "authorId" TEXT,
    "vacanciesImage" TEXT,

    CONSTRAINT "Vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PartnerToProfession" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DocumentToPartner" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfessionToVacancies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToVacancies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToPartner" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateToProfession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateToDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PartnerToProfession_AB_unique" ON "_PartnerToProfession"("A", "B");

-- CreateIndex
CREATE INDEX "_PartnerToProfession_B_index" ON "_PartnerToProfession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentToPartner_AB_unique" ON "_DocumentToPartner"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentToPartner_B_index" ON "_DocumentToPartner"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionToVacancies_AB_unique" ON "_ProfessionToVacancies"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionToVacancies_B_index" ON "_ProfessionToVacancies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToVacancies_AB_unique" ON "_LocationToVacancies"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToVacancies_B_index" ON "_LocationToVacancies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToPartner_AB_unique" ON "_LocationToPartner"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToPartner_B_index" ON "_LocationToPartner"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToLocation_AB_unique" ON "_CandidateToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToLocation_B_index" ON "_CandidateToLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToProfession_AB_unique" ON "_CandidateToProfession"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToProfession_B_index" ON "_CandidateToProfession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToDocument_AB_unique" ON "_CandidateToDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToDocument_B_index" ON "_CandidateToDocument"("B");

-- AddForeignKey
ALTER TABLE "Vacancies" ADD CONSTRAINT "Vacancies_partnerName_fkey" FOREIGN KEY ("partnerName") REFERENCES "Partner"("nameCompany") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancies" ADD CONSTRAINT "Vacancies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_vacanciesId_fkey" FOREIGN KEY ("vacanciesId") REFERENCES "Vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerToProfession" ADD CONSTRAINT "_PartnerToProfession_A_fkey" FOREIGN KEY ("A") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerToProfession" ADD CONSTRAINT "_PartnerToProfession_B_fkey" FOREIGN KEY ("B") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToPartner" ADD CONSTRAINT "_DocumentToPartner_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToPartner" ADD CONSTRAINT "_DocumentToPartner_B_fkey" FOREIGN KEY ("B") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionToVacancies" ADD CONSTRAINT "_ProfessionToVacancies_A_fkey" FOREIGN KEY ("A") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionToVacancies" ADD CONSTRAINT "_ProfessionToVacancies_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToVacancies" ADD CONSTRAINT "_LocationToVacancies_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToVacancies" ADD CONSTRAINT "_LocationToVacancies_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPartner" ADD CONSTRAINT "_LocationToPartner_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPartner" ADD CONSTRAINT "_LocationToPartner_B_fkey" FOREIGN KEY ("B") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToLocation" ADD CONSTRAINT "_CandidateToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToLocation" ADD CONSTRAINT "_CandidateToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToProfession" ADD CONSTRAINT "_CandidateToProfession_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToProfession" ADD CONSTRAINT "_CandidateToProfession_B_fkey" FOREIGN KEY ("B") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToDocument" ADD CONSTRAINT "_CandidateToDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToDocument" ADD CONSTRAINT "_CandidateToDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
