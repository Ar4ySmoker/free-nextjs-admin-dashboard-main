-- CreateTable
CREATE TABLE "_CandidateToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToLocation_AB_unique" ON "_CandidateToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToLocation_B_index" ON "_CandidateToLocation"("B");

-- AddForeignKey
ALTER TABLE "_CandidateToLocation" ADD CONSTRAINT "_CandidateToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToLocation" ADD CONSTRAINT "_CandidateToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
