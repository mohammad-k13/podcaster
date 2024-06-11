import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAi from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY as string,
});
export const generateAudioAction = action({
	args: { prompt: v.string(), voice: v.string() },
	handler: async (_, { voice, prompt }) => {
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: voice as SpeechCreateParams["voice"],
			input: prompt,
		});

		const buffer = await mp3.arrayBuffer();

		return buffer;
	},
});
