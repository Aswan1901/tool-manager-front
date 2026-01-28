'use client'
import Link from 'next/link'
import {Bell} from "lucide-react"
import Search from '@/app/components/Search';

const Navbar =()=>{
    return (
        <nav className="fixed top-0 w-full flex  justify-around py-5 px-24 border-b border-gray-700 bg-black text-white">
            <ul className="flex gap-10 text-lg">
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/tools">Tools</Link></li>
                    <li><Link href="/analytics">Analytics</Link></li>
                    <li><Link href="/settings">Settings</Link></li>
                    <li><Bell /></li>
                    <li><Search placeholder="Search tools..." /></li>
            </ul>
        </nav>
    )
};

export default Navbar;