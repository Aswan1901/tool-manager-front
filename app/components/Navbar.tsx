'use client';
import { useState, useRef, useEffect } from 'react';
import { Zap, Bell, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Search from './Search';

const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tools',     href: '/tools' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings',  href: '/settings' },
];

function NavLinks({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className={clsx(
                        'flex h-[48px] items-center rounded-md px-3 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors',
                        {
                            'bg-white/10 text-white': pathname === link.href,
                            'text-gray-400': pathname !== link.href,
                        },
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}

function UserDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
                    className="size-8 rounded-full bg-gray-800"
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
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-40 bg-black border-b border-gray-700 text-white">

            {/* Barre principale */}
            <div className="flex items-center justify-between py-4 px-6">

                {/* Logo */}
                <div className="font-bold flex items-center shrink-0">
                    <Zap className="rounded-sm inline-block bg-gradient-to-r from-blue-400 to-purple-500 p-1 mr-2" />
                    TechCorp
                </div>

                {/* Links desktop */}
                <ul className="hidden md:flex items-center gap-1">
                    <NavLinks />
                </ul>

                {/* Search + icônes droite */}
                <div className="flex items-center gap-4">
                    <div className="w-48 lg:w-64">
                        <Search placeholder="Search tools..." />
                    </div>
                    <Moon className="w-5 text-gray-400 hover:text-white cursor-pointer hidden md:block" />
                    <Bell className="w-5 text-gray-400 hover:text-white cursor-pointer hidden md:block" />
                    <UserDropdown />

                    {/* Hamburger — mobile only */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setMobileOpen(prev => !prev)}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Menu mobile déroulant */}
            {mobileOpen && (
                <div className="md:hidden flex flex-col px-4 pb-4 gap-1 border-t border-gray-700">
                    <NavLinks onClose={() => setMobileOpen(false)} />
                    <div className="flex items-center gap-4 pt-3 px-1">
                        <Moon className="w-5 text-gray-400" />
                        <Bell className="w-5 text-gray-400" />
                    </div>
                </div>
            )}
        </nav>
    );
}