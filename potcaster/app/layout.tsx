import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ConvexClerkProviders from "./providers/ConvexClerkProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Podcaster",
	description: "Generate Your Podcast using AI",
	icons: {
		icon: "/icons/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} custom-scrollbar`}>
				<ConvexClerkProviders>{children}</ConvexClerkProviders>
			</body>
		</html>
	);
}
