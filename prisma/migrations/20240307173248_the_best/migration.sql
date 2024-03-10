-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_vacanciesId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "managerId" DROP NOT NULL,
ALTER COLUMN "vacanciesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_vacanciesId_fkey" FOREIGN KEY ("vacanciesId") REFERENCES "Vacancies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
