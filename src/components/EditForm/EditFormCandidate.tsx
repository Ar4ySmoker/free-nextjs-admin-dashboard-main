//components/editform.tsx
"use client";

import { updateCandidate } from "@/db/queries/candidate";
import { useFormState } from "react-dom";
import type { Candidate } from "@prisma/client";

const UpdateForm = ({ candidate }: { candidate: Candidate }) => {
    const UpdateCandidateWithId = updateCandidate.bind(null, candidate.id);
    const [state, formAction] = useFormState(UpdateCandidateWithId, null);

    return (
        <div>
            <form action={formAction}>
                <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        placeholder="Full Name..."
                        defaultValue={candidate.name}
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="input input-bordered input-primary w-full max-w-xs"
                        placeholder="Email..."
                        defaultValue={candidate.email}
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="input input-bordered input-primary w-full max-w-xs"
                        placeholder="Phone Number..."
                        defaultValue={candidate.phone}
                    />
                    <div id="phone-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
                    </div>
                </div>
                <div id="message-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.message}</p>
                </div>
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;