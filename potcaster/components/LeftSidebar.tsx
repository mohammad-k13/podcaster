"use client";

import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LeftSidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<section className="left_sidebar">
			<nav className="flex flex-col gap-6">
				<Link href={"/"} className="flex items-center gap-1 pb-10 cursor-pointer max-lg:justify-center">
					<Image src={"/icons/logo.svg"} alt="logo" width={23} height={27} />
					<h1 className="text-24 text-white-1 uppercase max-lg:hidden">podcaster</h1>
				</Link>

				{sidebarLinks.map(({ route, label, imgURL }) => {
					const isActive = pathname === route || pathname.startsWith(`${route}/`);

					return (
						<Link
							key={label}
							href={route}
							className={cn(
								"flex items-center justify-center gap-3 py-4 max-lg:px-4 lg:justify-start",
								{ "bg-nav-focus border-r-4 border-orange-1": isActive },
							)}>
							<Image src={imgURL} alt="icon" width={24} height={24} />
							<p className="text-white-1">{label}</p>
						</Link>
					);
				})}
			</nav>
		</section>
	);
};

export default LeftSidebar;
