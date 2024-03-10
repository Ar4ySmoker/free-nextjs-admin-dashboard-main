//app/employee/page.tsx
import Link from "next/link";
import { getLocationlist } from "@/db/queries/location";
import { formatDate } from "@/db/utils";
import { DeleteButton } from "@/components/Delete/DeleteCandidate";

//const Employee = async () => {
const Location = async ({
    query
}: {
    query: string;
}) => {
    const locations = await getLocationlist(query);
    if (locations) {
    return (
        <div className="w-screen py-20 flex justify-center flex-col items-center">
            <div className="flex items-center justify-between gap-1 mb-5">
                <h1 className="text-4xl font-bold">Next.js 14 CRUD Create, Read, Update and Delete <br />Prisma PostgreSQL | TailwindCSS DaisyUI</h1>
            </div>
            <div className="overflow-x-auto">
                <div className="mb-2 w-full text-right">
                    <Link
                        href="/candidate/create"
                        className="btn btn-primary">
                        Create
                    </Link>
                </div>
                <table className="table table-zebra">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Phone Number</th>
                            <th className="py-3 px-6">Created At</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((rs, index) => (
                            <tr key={rs.id} className="bg-white border-b">
                                {/* <td className="py-3 px-6">{index + 1}</td> */}
                                <td className="py-3 px-6">{rs.name}</td>
                                {/* <td className="py-3 px-6">{rs.email}</td>
                                <td className="py-3 px-6">{rs.phone}</td> */}
                                {/* <td className="py-3 px-6">
                                    {formatDate(rs.createdAt.toString())}
                                </td> */}
                                <td className="flex justify-center gap-1 py-3">
                                    <Link
                                        href={`/candidate/edit/${rs.id}`}
                                        className="btn btn-info"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton id={rs.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    } else {
        return (
            console.log("error")
        )
    }
}
export default Location;