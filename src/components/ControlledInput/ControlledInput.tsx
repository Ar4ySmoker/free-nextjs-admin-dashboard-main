'use client'
import Link from "next/link"
import { Input } from "postcss"
import { useState } from "react"
interface ControlledInputInterface {
    item: any
    id: number
}
export const ControlledInput = ({ item, id }: ControlledInputInterface) => {
    const [inpValue, setInpValue] = useState<string>(String(item.name))
    const [isChecked, setIsChecked] = useState(false)
    const checkHandler = () => {
        setIsChecked(!isChecked)
    }
    return <div
        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        key={id}
    >
        <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">

                </div>
                <input value={inpValue} onChange={(e) => setInpValue(prev => prev = e.target.value)} className="text-sm" />
                {/* {item.name} */}

            </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
                {/* {product.category} */}
            </p>
        </div>
        <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
                {/* ${product.price} */}
            </p>
        </div>
        <div className="col-span-1 flex items-center">
            {/* <p className="text-sm text-black dark:text-white">{product.sold}</p> */}
        </div>
        <div className="col-span-1 flex items-center">
            <div className="mb-5">
                <input type="checkbox" id="checkbox" checked={isChecked} onChange={checkHandler} />
            </div>
        </div>
    </div>
}