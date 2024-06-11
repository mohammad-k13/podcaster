"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { voiceDetails } from "@/constants";
import { ReducerState, useReducer, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { ReducerActionType, ReducerStateType } from "@/types";

const StateReducer = (state: ReducerStateType, action: ReducerActionType) => {
	const { type, payload } = action;
	switch (type) {
		case "IMAGE":
			return { ...state, image: { [payload.propertyName]: payload.value } };
		case "AUDIO":
			return { ...state, audio: { [payload.propertyName]: payload.value } };
		case "VOICE":
			return { ...state, voice: { [payload.propertyName]: payload.value } };
		case "PENDING":
			return { ...state, pending: payload.value };
		default:
			return state;
	}
};

const CreatePodcast = () => {
	const [state, dispatch] = useReducer(StateReducer, {
		image: {
			prompt: "",
			storageId: "",
			url: "",
		},
		audio: {
			url: "",
			storageId: "",
			duration: 0,
		},
		voice: {
			type: "",
			prompt: "",
		},
		pending: false,
	});

	const formSchema = z.object({
		podcastTitle: z.string().min(2, {
			message: "title must be at least 2 characters.",
		}),
		podcastDescription: z.string().min(2, {
			message: "description must be at least 2 characters.",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			podcastTitle: "",
			podcastDescription: "",
		},
	});

	const onSubmit = () => {};

	return (
		<section className="flex flex-col mt-10">
			<h1 className="text-20 text-white-1 font-bold uppercase">create podcast</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
					<div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
						<FormField
							control={form.control}
							name="podcastTitle"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-2.5">
									<FormLabel className="text-16 font-bold text-white-1">
										Podcast Name
									</FormLabel>
									<FormControl>
										<Input
											className="input-class focus-visible:ring-offset-0 ring-2 ring-transparent focus-visible:ring-orange-1 transition-all"
											placeholder="first podcast pro"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-white-1 capitalize" />
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-2.5">
							<Label className="text-16 font-bold text-white-1 uppercase">
								select AI voice
							</Label>
							<Select
								onValueChange={(value) =>
									dispatch({
										type: "VOICE",
										payload: { propertyName: "type", value: value },
									})
								}>
								<SelectTrigger
									className={cn(
										"text-16 w-full border-none bg-black-1 text-gray-1 capitalize focus-visible:ring-offset-0 ring-2 ring-transparent focus-visible:ring-orange-1 transition-all",
										{},
									)}>
									<SelectValue
										placeholder="Select AI voice"
										className="placeholder:text-gray-1 capitalize "
									/>
								</SelectTrigger>
								<SelectContent className="text-16 font-bold border-none bg-black-1 text-white-1 focus:ring-orange-1 ">
									{voiceDetails.map(({ name, id }) => (
										<SelectItem
											key={id}
											value={name}
											className="capitalize hover:bg-orange-1 transition-all">
											{name}
										</SelectItem>
									))}
								</SelectContent>
								{state.voice.type !== "" && (
									<audio
										src={`/${state.voice.type}.mp3`}
										autoPlay
										className="hidden"
									/>
								)}
							</Select>
						</div>

						<FormField
							control={form.control}
							name="podcastDescription"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-2.5">
									<FormLabel className="text-16 font-bold text-white-1">
										Podcast Description
									</FormLabel>
									<FormControl>
										<Textarea
											className="input-class focus-visible:ring-offset-0 ring-2 ring-transparent focus-visible:ring-orange-1 transition-all"
											placeholder="Write Your Podcast Description"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-white-1 capitalize" />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-col pt-10">
						<GeneratePodcast
							voice={state.voice}
							audio={state.audio}
							AudioDispatch={dispatch}
							VoiceDispatch={dispatch}
						/>
						<GenerateThumbnail />

						<div className="mt-10 w-full">
							<Button
								type="submit"
								className="text-16 w-full bg-orange-1 font-extrabold text-white-1 border-[1px] border-transparent hover:bg-black-1 hover:border-white-3 hover:text-white-2 transition-all">
								{state.pending ? (
									<>
										Submitting
										<Loader size={20} className="animate-spin ml-2" />
									</>
								) : (
									"Submit & Publish Podcast"
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default CreatePodcast;
