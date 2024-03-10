import { getCandidatelist } from "@/db/queries/candidate";
import Link from "next/link";
import { DeleteButton } from "../Delete/DeleteCandidate";
// import Image from "next/image";

const ServerTableOne = async ({
  query,
}: { query: string }) => {
  const candidates = await getCandidatelist(query);

  if (candidates) {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Топ работников
        </h4>
          <Link
            href="/candidate/create"
            className=" cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
          >
            Create
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">

            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Имя
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Профессия
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Национальность
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Документы
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Местоположение
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Подробности
              </h5>
            </div>
          </div>
          <div>
            {candidates.map((rs, index) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-6 `}
                key={rs.id}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    {/* <Image src={} alt="Brand" width={48} height={48} /> */}
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {rs.name}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{rs.email}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {rs.name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{rs.name} {rs.name}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{rs.name}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <div className="mb-5 flex gap-2">
                    <Link
                      href={`/candidate/edit/${rs.id}`}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                    >Edit
                    </Link>
                    <DeleteButton id={rs.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      console.log("error")
    );
  }
};

export default ServerTableOne;
