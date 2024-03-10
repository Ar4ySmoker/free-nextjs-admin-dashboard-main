//components/delete.tsx
import { deleteCandidate } from "@/db/queries/candidate";

export const DeleteButton = ({ id }: { id: string }) => {
    const DeleteCandidateWithId = deleteCandidate.bind(null, id);
    return (
        <form action={DeleteCandidateWithId}>
            <button className="w-full cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90">
                Delete
            </button>
        </form>
    );
};