/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `CandidatesOnLocations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToLocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CandidatesOnLocations" DROP CONSTRAINT "CandidatesOnLocations_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "CandidatesOnLocations" DROP CONSTRAINT "CandidatesOnLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_B_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Candidate_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- DropTable
DROP TABLE "CandidatesOnLocations";

-- DropTable
DROP TABLE "_CandidateToLocation";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
