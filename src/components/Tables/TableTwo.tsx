// import Image from "next/image";
// import { Product } from "@/types/product";
import { fetchLocation } from "@/db/queries/location"
import { updateLocation } from "@/db/queries/location";
import Link from "next/link";
import { useState } from "react";
import { ControlledInput } from "../ControlledInput/ControlledInput";

// const productData: Product[] = [
//   {
//     image: "/images/product/product-01.png",
//     name: "Apple Watch Series 7",
//     category: "Electronics",
//     price: 296,
//     sold: 22,
//     profit: 45,
//   },
//   {
//     image: "/images/product/product-02.png",
//     name: "Macbook Pro M1",
//     category: "Electronics",
//     price: 546,
//     sold: 12,
//     profit: 125,
//   },
//   {
//     image: "/images/product/product-03.png",
//     name: "Dell Inspiron 15",
//     category: "Electronics",
//     price: 443,
//     sold: 64,
//     profit: 247,
//   },
//   {
//     image: "/images/product/product-04.png",
//     name: "HP Probook 450",
//     category: "Electronics",
//     price: 499,
//     sold: 72,
//     profit: 103,
//   },
// ];

const TableTwo = async () => {
  const location = await fetchLocation();

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

      {location.map((item, id) => (

        <ControlledInput key={id} item={item} id={id} />
      ))}

    </div>

  );
};

export default TableTwo;
