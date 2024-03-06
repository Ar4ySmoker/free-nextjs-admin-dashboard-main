/*
  Warnings:

  - You are about to drop the `_CandidateToLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToLocation" DROP CONSTRAINT "_CandidateToLocation_B_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "locationId" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "candidateId" SERIAL NOT NULL;

-- DropTable
DROP TABLE "_CandidateToLocation";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
