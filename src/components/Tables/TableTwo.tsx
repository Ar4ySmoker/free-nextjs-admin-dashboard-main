import Image from "next/image";
import { Product } from "@/types/product";
import { getProfessionlist } from "@/db/queries/professions";



const TableTwo = async (
  {
    query,
  }: { query: string }
) => {
  const professions = await getProfessionlist(query);
  if (professions) {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Топ вакансий
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Название</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Город</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Оплата</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Проживание</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Подробности</p>
          </div>
        </div>

        {professions.map((rs, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={rs.id}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">

                </div>
                <p className="text-sm text-black dark:text-white">
                  {rs.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {rs.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                ${rs.countPartners}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{rs.id}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  else {
    return null; // или <></>
  }
};

export default TableTwo;
