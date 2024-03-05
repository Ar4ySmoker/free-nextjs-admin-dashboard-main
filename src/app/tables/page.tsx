import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServerTableOne  from "@/components/Tables/ServerTableOne"

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Работники" />

      <div className="flex flex-col gap-10">
        <TableOne>
          <ServerTableOne />
        </TableOne>
        
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
