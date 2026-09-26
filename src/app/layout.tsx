import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "FitLog",
    description: "Workout Library",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />

                {children}

                <Footer />
            </body>
        </html>
    );
}