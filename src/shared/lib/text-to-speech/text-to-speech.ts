import { YandexSpeechKitClient } from './api';
import { base64ToBlob } from './utils';

type TextToSpeechParams = {
	text: string;
	volume?: number;
};

/**
 *
 * @param text string
 * @param volume number in range: [0.099, 1]
 * @returns plays audio
 */
export async function textToSpeech(params: TextToSpeechParams): Promise<void> {
	const { text, volume = '0.2' } = params;
	try {
		const { data } = await YandexSpeechKitClient.post('', {
			text,
			loudnessNormalizationType: 'MAX_PEAK',
			hints: [
				{
					voice: 'ermil',
					volume,
					outputAudioSpec: {
						containerAudio: {
							containerAudioType: 'OGG_OPUS',
						},
					},
				},
			],
			responseType: 'arraybuffer',
		});

		const base64Audio = data.result.audioChunk.data;
		const audioBlob = base64ToBlob(base64Audio, 'audio/ogg');
		const audioUrl = URL.createObjectURL(audioBlob);
		const audio = new Audio(audioUrl);
		audio.play();
	} catch (error) {
		return Promise.reject(error);
	}
}
