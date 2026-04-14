'use client';
import { useState, useRef, useEffect } from 'react';
import { Zap, Bell, Moon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Dashboard', href: '/dashboard'},
    { name: 'Tools',     href: '/tools'},
    { name: 'Analytics', href: '/analytics'},
    { name: 'Settings',  href: '/settings'},
];

function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] items-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors',
                            {
                                'bg-white/10 text-white': pathname === link.href,
                                'text-gray-400': pathname !== link.href,
                            },
                        )}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}

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
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 z-50 border border-white/10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Logout</a>
                </div>
            )}
        </div>
    );
}

export default function Nav() {
    return (
        <nav className="fixed top-0 w-full flex items-center justify-between py-4 px-8 border-b border-gray-700 bg-black text-white z-40">
            {/* Logo */}
            <div className="font-bold flex items-center">
                <Zap className="rounded-sm inline-block bg-gradient-to-r from-blue-400 to-purple-500 p-1 mr-2" />
                TechCorp
            </div>

            {/* Nav links */}
            <ul className="hidden sm:flex items-center gap-1">
                <NavLinks />
            </ul>

            {/* Right icons */}
            <div className="flex items-center gap-4">
                <Moon className="w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Bell className="w-5 text-gray-400 hover:text-white cursor-pointer" />
                <UserDropdown />
            </div>
        </nav>
    );
}