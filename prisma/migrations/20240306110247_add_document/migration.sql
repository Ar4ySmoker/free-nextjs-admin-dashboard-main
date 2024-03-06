-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "documentId" INTEGER;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "candidateId" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
