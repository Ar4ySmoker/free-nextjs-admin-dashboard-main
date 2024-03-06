/*
  Warnings:

  - You are about to drop the column `proffesionId` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_proffesionId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "proffesionId",
ADD COLUMN     "professionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
