import { FlipWords } from "@/components/ui/flip-words";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "@/components/ui/button";

const testimonials = [
	{
		quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
		name: "Charles Dickens",
		title: "A Tale of Two Cities",
	},
	{
		quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
		name: "William Shakespeare",
		title: "Hamlet",
	},
	{
		quote: "All that we see or seem is but a dream within a dream.",
		name: "Edgar Allan Poe",
		title: "A Dream Within a Dream",
	},
	{
		quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
		name: "Jane Austen",
		title: "Pride and Prejudice",
	},
	{
		quote: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
		name: "Herman Melville",
		title: "Moby-Dick",
	},
];

const words = ["better", "cute", "beautiful", "modern"];

const Home = () => {
	return (
		<section className="w-full h-fit flex flex-col items-center justify-between gap-10 mt-24">
			<main>
				{" "}
				<div className="h-fit flex flex-col justify-center items-start px-4 gap-6 max-md:items-center">
					<div className="text-4xl md:text-5xl lg:text-7xl  mx-auto font-normal text-black/90 dark:text-neutral-300 max-md:text-center">
						Build
						<FlipWords words={words} /> <br />
						websites with Aceternity UI
					</div>
					<Button className="bg-blue-600 text-neutral-100 hover:bg-blue-400 active:scale-95 transition-all">
						See Products{" "}
					</Button>
				</div>
			</main>
			<footer className="w-full">
				<InfiniteMovingCards items={testimonials} direction="left" speed="fast" />
				<InfiniteMovingCards items={testimonials} direction="right" speed="fast" />
			
      </footer>
		</section>
	);
};

export default Home;
