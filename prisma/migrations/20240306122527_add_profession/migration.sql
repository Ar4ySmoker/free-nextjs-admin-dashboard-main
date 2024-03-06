-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "proffesionId" INTEGER;

-- AlterTable
ALTER TABLE "Profession" ADD COLUMN     "candidateId" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_proffesionId_fkey" FOREIGN KEY ("proffesionId") REFERENCES "Profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
