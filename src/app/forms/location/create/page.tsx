
"use client";

import { useFormState } from "react-dom"
import { saveLocation } from "@/db/queries/location";

const CreateLocation = () => {
    const [state, formAction] = useFormState(saveLocation, null);
    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Add New Location</h1>
            <div>
                <form action={formAction}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input input-bordered input-primary w-full max-w-xs"
                            placeholder="Location..."
                        />
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
                        </div>
                    </div>
                  

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
};

export default CreateLocation;