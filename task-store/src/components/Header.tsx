import Link from "next/link";
import React, { ReactNode } from "react";
import { ModeToggle } from "./ModeToggle";
import {
	AvatarIcon,
	CardStackIcon,
	ComponentPlaceholderIcon,
	GitHubLogoIcon,
	HamburgerMenuIcon,
	HomeIcon,
	LockOpen1Icon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type labelType = "profile" | "cart" | "login" | "products" | "home";
const links: { label: labelType; path: string; icon: ReactNode }[] = [
	{ label: "home", path: "/", icon: <HomeIcon /> },
	{ label: "products", path: "/products", icon: <ComponentPlaceholderIcon /> },
	{ label: "login", path: "/login", icon: <LockOpen1Icon /> },
	{ label: "cart", path: "/card", icon: <CardStackIcon /> },
	{ label: "profile", path: "/profile", icon: <AvatarIcon /> },
];

const Header = () => {
	const items = (fillterLinkName?: labelType) =>
		fillterLinkName
			? links
					.filter((item) => item.label !== fillterLinkName)
					.map((link) => (
						<li
							key={link.label}
							className="w-full text-sm text-gray-600 dark:text-gray-400 dark:hover:text-blue-500 hover:bg-blue-100 p-2 rounded-md  hover:text-blue-500  transition-colors cursor-pointer">
							<Link
								href={link.path}
								className="w-fit flex items-center flex-row-reverse gap-1">
								{link.label}
								{link.icon}
							</Link>
						</li>
					))
			: links.map((link) => (
					<li
						key={link.label}
						className="w-full text-sm text-gray-600 dark:text-gray-400 dark:hover:text-blue-500 hover:bg-blue-100 p-2 rounded-md hover:text-blue-500  transition-colors cursor-pointer">
						<Link href={link.path} className="w-fit flex items-center flex-row-reverse gap-1">
							{link.label}
							{link.icon}
						</Link>
					</li>
			  ));
	return (
		<header className="w-[95%] h-14 border fixed top-3 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-between px-5 backdrop-blur-sm ">
			<ul className="flex items-center gap-5 max-md:hidden">{items()}</ul>
			<Sheet>
				<SheetTrigger>
					<Button variant={"outline"} size={"icon"} className="md:hidden dark:text-neutral-600">
						<HamburgerMenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent side={"left"} className="w-[65%]">
					<SheetHeader>
						<SheetTitle>Do Want Know Us?</SheetTitle>
						<Button className="my-2 ">About Us</Button>
					</SheetHeader>
					<Separator className="my-10" />
					<ul className="flex flex-col items-start gap-2">{items("profile")}</ul>
					<footer className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%]">
						<Separator className="my-5" />
						<p className="w-full text-sm text-gray-600 dark:text-gray-400 dark:hover:text-blue-500 hover:text-blue-500 hover:bg-blue-100 p-2 rounded-md  transition-colors cursor-pointer flex items-center flex-row-reverse justify-end gap-1">
							Profile
							<AvatarIcon />
						</p>
					</footer>
				</SheetContent>
			</Sheet>
			<div className="flex items-center gap-2">
				<ModeToggle />
				<Button size={"icon"} variant={"outline"}>
					<a href="https://github.com/mohammad-k13" target="_blank">
						<GitHubLogoIcon className=" dark:text-neutral-600" />
					</a>
				</Button>
			</div>
		</header>
	);
};

export default Header;
