/*
  Warnings:

  - You are about to drop the column `vacanciesId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `documentFile` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `documentImage` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `managerImage` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `partnerImage` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `countPartners` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the column `needCandidate` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the `Vacancies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToProfession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DocumentToPartner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LocationToPartner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LocationToVacancies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PartnerToProfession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessionToVacancies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `documentsId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Made the column `locationId` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `managerId` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homePrice` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transport` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_vacanciesId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancies" DROP CONSTRAINT "Vacancies_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancies" DROP CONSTRAINT "Vacancies_partnerName_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToDocument" DROP CONSTRAINT "_CandidateToDocument_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToDocument" DROP CONSTRAINT "_CandidateToDocument_B_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_B_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToProfession" DROP CONSTRAINT "_CandidateToProfession_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToProfession" DROP CONSTRAINT "_CandidateToProfession_B_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentToPartner" DROP CONSTRAINT "_DocumentToPartner_A_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentToPartner" DROP CONSTRAINT "_DocumentToPartner_B_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToPartner" DROP CONSTRAINT "_LocationToPartner_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToPartner" DROP CONSTRAINT "_LocationToPartner_B_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToVacancies" DROP CONSTRAINT "_LocationToVacancies_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToVacancies" DROP CONSTRAINT "_LocationToVacancies_B_fkey";

-- DropForeignKey
ALTER TABLE "_PartnerToProfession" DROP CONSTRAINT "_PartnerToProfession_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartnerToProfession" DROP CONSTRAINT "_PartnerToProfession_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionToVacancies" DROP CONSTRAINT "_ProfessionToVacancies_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionToVacancies" DROP CONSTRAINT "_ProfessionToVacancies_B_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "vacanciesId",
ADD COLUMN     "documentsId" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "professionId" TEXT NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL,
ALTER COLUMN "managerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "documentFile",
DROP COLUMN "documentImage";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "managerImage";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "partnerImage",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "body",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "homePrice" TEXT NOT NULL,
ADD COLUMN     "partnerName" TEXT,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transport" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Profession" DROP COLUMN "countPartners",
DROP COLUMN "description",
DROP COLUMN "needCandidate";

-- DropTable
DROP TABLE "Vacancies";

-- DropTable
DROP TABLE "_CandidateToDocument";

-- DropTable
DROP TABLE "_CandidateToLocation";

-- DropTable
DROP TABLE "_CandidateToProfession";

-- DropTable
DROP TABLE "_DocumentToPartner";

-- DropTable
DROP TABLE "_LocationToPartner";

-- DropTable
DROP TABLE "_LocationToVacancies";

-- DropTable
DROP TABLE "_PartnerToProfession";

-- DropTable
DROP TABLE "_ProfessionToVacancies";

-- CreateTable
CREATE TABLE "Other" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Other_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToPost_AB_unique" ON "_LocationToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToPost_B_index" ON "_LocationToPost"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_partnerName_fkey" FOREIGN KEY ("partnerName") REFERENCES "Partner"("nameCompany") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_documentsId_fkey" FOREIGN KEY ("documentsId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPost" ADD CONSTRAINT "_LocationToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPost" ADD CONSTRAINT "_LocationToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
