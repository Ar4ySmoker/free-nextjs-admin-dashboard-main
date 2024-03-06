//components/delete.tsx
import { deleteCandidate } from "@/db/queries/candidate";

export const DeleteButton = ({ id }: { id: string }) => {
    const DeleteCandidateWithId = deleteCandidate.bind(null, id);
    return (
        <form action={DeleteCandidateWithId}>
            <button className="btn btn-error">
                Delete
            </button>
        </form>
    );
};