/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

export interface EmptyStateProps {
	title: string;
	search?: boolean;
	buttonText?: string;
	buttonLink?: string;
}

export interface TopPodcastersProps {
	_id: Id<"users">;
	_creationTime: number;
	email: string;
	imageUrl: string;
	clerkId: string;
	name: string;
	podcast: {
		podcastTitle: string;
		podcastId: Id<"podcasts">;
	}[];
	totalPodcasts: number;
}

export interface PodcastProps {
	_id: Id<"podcasts">;
	_creationTime: number;
	audioStorageId: Id<"_storage"> | null;
	user: Id<"users">;
	podcastTitle: string;
	podcastDescription: string;
	audioUrl: string | null;
	imageUrl: string | null;
	imageStorageId: Id<"_storage"> | null;
	author: string;
	authorId: string;
	authorImageUrl: string;
	voicePrompt: string;
	imagePrompt: string | null;
	voiceType: string;
	audioDuration: number;
	views: number;
}

export interface ProfilePodcastProps {
	podcasts: PodcastProps[];
	listeners: number;
}

type ImageActionType = {
	type: "IMAGE";
	payload: {
		propertyName: "url" | "prompt" | "storageId";
		value: string | number;
	};
};

type AudioActionType = {
	type: "AUDIO";
	payload: {
		propertyName: "url" | "duration" | "storageId";
		value: string | number;
	};
};

type VoiceActionType = {
	type: "VOICE";
	payload: {
		propertyName: "type" | "prompt";
		value: string | number;
	};
};

type PendingActionType = {
	type: "PENDING";
	payload: { value: boolean };
};

export type ReducerActionType = ImageActionType | AudioActionType | VoiceActionType | PendingActionType;

export interface ReducerStateType {
	image: {
		prompt?: string;
		storageId?: string;
		url?: string;
	};
	audio: {
		url?: string;
		storageId?: string;
		duration?: number;
	};
	voice: {
		type?: string;
		prompt?: string;
	};
	pending?: boolean;
}

export interface GeneratePodcastProps {
	AudioDispatch: Dispatch<ReducerActionType>;
	VoiceDispatch: Dispatch<ReducerActionType>;
	voice: ReducerStateType["voice"];
	audio: ReducerStateType["audio"];
}

export interface GenerateThumbnailProps {
	setImage: Dispatch<ReducerActionType>;
	setImageStorageId: Dispatch<ReducerActionType>;
	image: string;
	imagePrompt: string;
	setImagePrompt: Dispatch<ReducerActionType>;
}

export interface LatestPodcastCardProps {
	imgUrl: string;
	title: string;
	duration: string;
	index: number;
	audioUrl: string;
	author: string;
	views: number;
	podcastId: Id<"podcasts">;
}

export interface PodcastDetailPlayerProps {
	audioUrl: string;
	podcastTitle: string;
	author: string;
	isOwner: boolean;
	imageUrl: string;
	podcastId: Id<"podcasts">;
	imageStorageId: Id<"_storage">;
	audioStorageId: Id<"_storage">;
	authorImageUrl: string;
	authorId: string;
}

export interface AudioProps {
	title: string;
	audioUrl: string;
	author: string;
	imageUrl: string;
	podcastId: string;
}

export interface AudioContextType {
	audio: AudioProps | undefined;
	setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface PodcastCardProps {
	imgUrl: string;
	title: string;
	description: string;
	podcastId: Id<"podcasts">;
}

export interface CarouselProps {
	fansLikeDetail: TopPodcastersProps[];
}

export interface ProfileCardProps {
	podcastData: ProfilePodcastProps;
	imageUrl: string;
	userFirstName: string;
}

export type UseDotButtonType = {
	selectedIndex: number;
	scrollSnaps: number[];
	onDotButtonClick: (index: number) => void;
};
