import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "@/app/components/Providers";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <Providers>
            <Navbar />
            <main>{children}</main>
        </Providers>
        </body>
        </html>
    );
}