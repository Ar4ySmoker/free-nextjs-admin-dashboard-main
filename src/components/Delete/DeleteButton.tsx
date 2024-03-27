//components/delete.tsx
import { deleteCandidate } from "@/db/queries/candidate";
import { deleteLocation } from "@/db/queries/location";

export const DeleteButton = ({ id }: { id: string }) => {
    const deleteLocationId = deleteLocation.bind(null, id)
    const deleteCandidateId = deleteCandidate.bind(null, id);
    return (
        <><form action={deleteLocationId}>
            <button className="w-full cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90">
                Delete
            </button>
        </form><form action={deleteCandidateId}>
                <button className="w-full cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90">
                    Delete
                </button>
            </form></>
    );
};