import { YandexApiConfig } from '@/shared/config/yandex';
import { YandexTranslateClient } from './api';

type TranslateParams = {
	texts: string[];
	sourceLanguageCode: string;
	targetLanguageCode: string;
	format?: 'FORMAT_UNSPECIFIED' | 'PLAIN_TEXT' | 'HTML';
	speller?: boolean;
};

interface TranslateResponse {
	translations: { text: string }[];
}

export async function translate(params: TranslateParams): Promise<TranslateResponse> {
	const {
		texts = [],
		sourceLanguageCode = 'en',
		targetLanguageCode = 'ru',
		format = 'PLAIN_TEXT',
		speller = false,
	} = params;

	try {
		const { data } = await YandexTranslateClient.post('', {
			sourceLanguageCode,
			targetLanguageCode,
			format,
			texts,
			folderId: YandexApiConfig.folderId,
			speller,
		});

		return Promise.resolve(data as TranslateResponse);
	} catch (error) {
		console.error('Error in translate API: ', error);
		return Promise.reject(error);
	}
}
