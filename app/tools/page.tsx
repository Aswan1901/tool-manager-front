"use client"

import ToolsCard from "@/app/components/ToolsCard"
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";

import Jira from "@/app/ToolsIcon/jira.png";
import Adobe from "@/app/ToolsIcon/adobe.png";
import Canva from "@/app/ToolsIcon/canva.png";
import Figma from "@/app/ToolsIcon/figma.png";
import Github from "@/app/ToolsIcon/github.png";
import Hubspot from "@/app/ToolsIcon/hubspot.png";
import Zoom from "@/app/ToolsIcon/zoom.png";
import Slack from "@/app/ToolsIcon/slack.png";
import Notion from "@/app/ToolsIcon/notion.png";
import Office from "@/app/ToolsIcon/office.png";

export default function ToolsPage () {

    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const img = {
        Jira, GitHub: Github, Adobe, HubSpot: Hubspot,
        Zoom, Slack, Notion, Office, Canva, Figma,
    }

    const [toolsData, setToolsData] = useState<any[]>([])
    useEffect(() => {
        async function fetchTools(){
            const response = await fetch('https://tt-jsonserver-01.alt-tools.tech/tools')
            const json = await response.json()
            setToolsData(json);
        }
        fetchTools()
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-8 text-white bg-black">
            <h1 className="ml-2 md:ml-10 mt-16 md:mt-15 mb-5 text-3xl md:text-5xl font-semibold">
                Tools
            </h1>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolsData.filter((tool) =>
                        tool.name.toLowerCase().includes(query.toLowerCase()) ||
                        tool.owner_department.toLowerCase().includes(query.toLowerCase()) ||
                        tool.status.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((tool) => {
                        const formatedDate = tool.updated_at ? tool.updated_at.split("T")[0] : "-";
                        const iconImg = img[tool.name as keyof typeof img];

                        return (
                            <ToolsCard
                                key={tool.id}
                                name={tool.name}
                                image={iconImg}
                                category={tool.category}
                                userCount={tool.active_users_count}
                                monthlyCost={tool.monthly_cost}
                                update={formatedDate}
                                department={tool.owner_department}
                                description={tool.description}
                                status={tool.status}
                            />
                        );
                    })}
            </div>
        </div>
    );
}