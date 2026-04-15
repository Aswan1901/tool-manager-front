import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {Moon} from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
        >
            {theme === 'light' ? <Moon className="w-5 text-gray-400" /> : <Moon className="w-5 text-white-400" />}
        </button>
    );
};
export default ThemeToggle;