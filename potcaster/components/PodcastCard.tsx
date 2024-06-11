import { PodcastDataType } from "@/constants";
import Image from "next/image";
import React from "react";

type PodcastCardProps = {
	podcastInfo: PodcastDataType;
};
const PodcastCard = ({ podcastInfo }: PodcastCardProps) => {
	const { description, id, imgURL, title } = podcastInfo;
	return (
		<div className="cursor-pointer">
			<figure className="flex flex-col gap-2 group">
				<div className="w-[174px] h-[174px] overflow-hidden rounded-lg 2xl:size-[200px]">
					<Image
						src={imgURL}
						alt={title}
						width={174}
						height={174}
						className="aspect-square h-fit w-full group-hover:scale-125 transition-all"
					/>
				</div>
				<div className="flex flex-col">
					<h1 className="text-white-1 text-16 truncate ">{title}</h1>
					<p className="text-white-4 text-14 truncate capitalize">{description}</p>
				</div>
			</figure>
		</div>
	);
};

export default PodcastCard;
