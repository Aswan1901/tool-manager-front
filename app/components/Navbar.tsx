'use client';
import { useState, useRef, useEffect } from 'react';
import { Zap, Bell, Search, Moon, Settings } from 'lucide-react';
import Link from 'next/link';

function UserDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative ml-3" ref={ref}>
            <button
                onClick={() => setOpen(prev => !prev)}
                className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Your profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Sign out</a>
                </div>
            )}
        </div>
    );
}

function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="block sm:hidden">
            <button onClick={() => setOpen(prev => !prev)} className="text-white p-2">
                ☰
            </button>
            {open && (
                <div className="space-y-1 px-2 pt-2 pb-3 absolute top-full left-0 w-full bg-black border-t border-gray-700 z-50">
                    <a href="#" aria-current="page" className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Dashboard</a>
                    <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</a>
                    <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</a>
                    <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
                </div>
            )}
        </div>
    );
}

export default function Nav() {
    return (
        <nav className="fixed top-0 w-full flex justify-around py-5 px-24 border-b border-gray-700 bg-black text-white relative">
            <div className="font-bold">
                <Zap className="rounded-sm inline-block bg-gradient-to-r from-blue-400 to-purple-500 p-1 mr-2" />
                TechCorp
            </div>
            <ul className="hidden sm:flex gap-10 text-lg">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/tools">Tools</Link></li>
                <li><Link href="/analytics">Analytics</Link></li>
                <li><Link href="/settings">Settings</Link></li>
            </ul>
            <div className="flex items-center gap-4">
                <Moon />
                <Bell />
                <Settings />
                <UserDropdown />
                <MobileMenu />
            </div>
        </nav>
    );
}