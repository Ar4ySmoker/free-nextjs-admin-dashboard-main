-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_locationId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "locationId" DROP NOT NULL,
ALTER COLUMN "locationId" DROP DEFAULT;
DROP SEQUENCE "Candidate_locationId_seq";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
