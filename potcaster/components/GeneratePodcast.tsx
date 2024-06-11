"use client";
import { GeneratePodcastProps } from "@/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { generateUploadUrl } from "@/convex/files";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "./ui/use-toast";

//Custom Hook for this component
const useGeneratePodcast = (props: GeneratePodcastProps) => {
	const [isGenerating, setIsGenerating] = useState(false);
	const { AudioDispatch, VoiceDispatch, audio, voice } = props;
	const { toast } = useToast();

	//server Action & Mutation
	const getPodcastAudio = useAction(api.elevenai.generateAudioAction);
	const generateUploadUrl = useMutation(api.files.generateUploadUrl);
	const getAudioUrl = useMutation(api.podcasts.getUrl);
	const { startUpload } = useUploadFiles(generateUploadUrl);

	const generatePodcast = async () => {
		setIsGenerating(true);
		AudioDispatch({ type: "AUDIO", payload: { propertyName: "url", value: "" } });

		if (!voice.prompt) {
			toast({
				title: "please Provide voice prompt",
			});
			return setIsGenerating(false);
		}

		try {
			//generate podcast speech
			const response = await getPodcastAudio({
				voice: voice.type as string,
				prompt: voice.prompt as string,
			});
			console.log(response);

			//create podcast file
			const blob = new Blob([response!], { type: "audio/mpeg" });
			const fileName = `podcast-${uuidv4}.mp3`;
			const file = new File([blob], fileName, { type: "audio/mpeg" });

			//upload file and get Storage Id
			const uploaded = await startUpload([file]);
			const storageId = (uploaded[0].response as any).storageId;

			//set State
			AudioDispatch({ type: "AUDIO", payload: { propertyName: "storageId", value: storageId } });
			const audioUrl = await getAudioUrl({ storageId });

			AudioDispatch({ type: "AUDIO", payload: { propertyName: "url", value: audioUrl! } });
			setIsGenerating(false);

			//showing success message
			toast({
				title: "podcast Generate",
			});
		} catch (err) {
			console.log("Error while generate podcast", err);
			toast({
				title: "An Error happend",
				variant: "destructive",
			});
			setIsGenerating(false);
		}
	};

	return {
		isGenerating,
		generatePodcast,
	};
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
	const { AudioDispatch, VoiceDispatch, audio, voice } = props;
	const { generatePodcast, isGenerating } = useGeneratePodcast(props);

	return (
		<div>
			<div className="flex flex-col gap-2 5">
				<Label className="text-16 font-bold text-white-1">AI Promp to generate podcast</Label>
				<Textarea
					className="input-class font-light focus-visible:ring-offset-0 ring-2 ring-transparent focus-visible:ring-orange-1 transition-all"
					placeholder="Provide Text To Generate Audio"
					rows={5}
					value={voice.prompt!}
					onChange={(e) =>
						VoiceDispatch({
							type: "VOICE",
							payload: { propertyName: "prompt", value: e.target.value as string },
						})
					}
				/>
			</div>
			<div className="mt-5 w-full max-w-[200px]">
				<Button
					type="submit"
					className="text-16 bg-orange-1 font-bold text-white-1"
					onClick={generatePodcast}>
					{isGenerating ? (
						<>
							Generating
							<Loader size={20} className="animate-spin ml-2" />
						</>
					) : (
						"Generate"
					)}
				</Button>
			</div>
			{audio.url && (
				<audio
					controls
					src={audio.url!}
					autoPlay
					className="mt-5"
					onLoadedMetadata={(e) =>
						AudioDispatch({
							type: "AUDIO",
							payload: {
								propertyName: "duration",
								value: e.currentTarget.duration,
							},
						})
					}
				/>
			)}
		</div>
	);
};

export default GeneratePodcast;
