import Link from 'next/link'

const Navbar =()=>{
    return (
        <nav className="fixed top-0 w-full flex items-center justify-around py-5 px-24 border-b border-gray-700 bg-black">
            <ul className="flex gap-10 text-lg">
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                <Link href="/tools" className="text-gray-300 hover:text-white transition-colors">Tools</Link>
                <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
                <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">Settings</Link>
            </ul>
        </nav>
    )
};

export default Navbar;