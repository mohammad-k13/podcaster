import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex flex-col">
			<main className="relative flex bg-black-3">
				<LeftSidebar />

				<section className="min-h-screen flex-1 flex flex-col px-4 sm:px-14">
					<div className="mx-auto w-full max-w-5xl flex flex-col max-sm:px-4">
						<div className="flex items-center justify-between h-16 md:hidden">
							<Image src={"/icons/logo.svg"} alt="logo" width={30} height={30} />
							<MobileNav />
						</div>
						<div>
							<Toaster />
							{children}
						</div>
					</div>
				</section>

				<RightSidebar />
			</main>
		</div>
	);
}
