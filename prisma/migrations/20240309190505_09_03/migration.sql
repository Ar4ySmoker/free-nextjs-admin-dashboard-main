-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "phone" TEXT;
