/*
  Warnings:

  - You are about to drop the column `documentId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `professionId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Profession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_professionId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "documentId",
DROP COLUMN "locationId",
DROP COLUMN "professionId",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "candidateId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "candidateId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profession" DROP COLUMN "candidateId";

-- CreateTable
CREATE TABLE "CandidatesOnLocations" (
    "locationId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CandidatesOnLocations_pkey" PRIMARY KEY ("locationId","candidateId")
);

-- AddForeignKey
ALTER TABLE "CandidatesOnLocations" ADD CONSTRAINT "CandidatesOnLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatesOnLocations" ADD CONSTRAINT "CandidatesOnLocations_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
