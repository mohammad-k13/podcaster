"use client";

import { podcastData } from "@/constants";
import PodcastCard from "@/components/PodcastCard";

const Home = () => {
	return (
		<div className="mt-9 flex flex-col gap-9">
			<div className="flex flex-col items-center justify-between text-white-1">
			</div>
			<section className="flex flex-col gap-5">
				<h1 className="text-20 text-white-1 font-bold uppercase">trending podcasts</h1>
				<div className="podcast_grid">
					{podcastData.map((podcastInfo) => (
						<PodcastCard key={podcastInfo.id} podcastInfo={podcastInfo} />
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
