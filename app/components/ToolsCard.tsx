import {ReactNode} from "react";
import Image from "next/image";



export default function ToolsCard({name,image,category,userCount,monthlyCost,update,department,description, status}:{
    key: string,
    image: any,
    name: string,
    category: string,
    userCount: string,
    monthlyCost: string,
    update: string,
    department: string,
    description: string,
    status: "Active" | "Unused" | "Expiring"
}) {
    const statusStyles = {
        active: "bg-gradient-to-r from-green-400 to-blue-500 p-1",
        expiring: "bg-gradient-to-r from-orange-400 to-red-500",
        unused: "bg-gradient-to-r from-pink-400 to-red-500",
    }

    return (
        <div className="flex-1 rounded-2xl bg-zinc-900 p-5">
            <div className="flex justify-between">
                <div className="font-semibold text-lg">{name}</div>
                <div className="text-sm">Department: {department}</div>
                <Image src={image} alt={name} width={50} height={50} />
            </div>
            <div className="text-xs text-gray-400">{category}</div>
            <div className="text-sm flex justify-between">
                <div>User Count: {userCount}</div>
                <div>Monthly Cost: {monthlyCost}</div>
                <div>Last update: {update}</div>
            </div>
            <div className="flex justify-between mt-7">
                <div>{description}</div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                {status}
                </span>
            </div>
        </div>
    );
}