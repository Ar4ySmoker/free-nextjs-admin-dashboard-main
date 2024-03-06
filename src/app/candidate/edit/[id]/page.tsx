//app/employee/edit/[id]/page.tsx
import UpdateForm from "@/components/EditForm/EditFormCandidate";
import { getCandidateById } from "@/db/queries/candidate";
import { notFound } from "next/navigation";


const UpdateCandidatePage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const candidate = await getCandidateById(id);
    //console.log(employee);

    if (!candidate) {
        notFound();
    }

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Update Employee</h1>
            <UpdateForm candidate={candidate} />
        </div>
    );
};

export default UpdateCandidatePage;