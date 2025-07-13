export const YandexApiConfig = {
	folderId: import.meta.env.VITE_YANDEX_FOLDER_ID as string,
	translate: {
		uri: import.meta.env.VITE_YANDEX_TRANSLATE_API_URL as string,
		apiKey: import.meta.env.VITE_YANDEX_TRANSLATE_API_KEY as string,
	},
	speechKit: {
		uri: import.meta.env.VITE_YANDEX_SPEECH_KIT_API_URL as string,
		apiKey: import.meta.env.VITE_YANDEX_SPEECH_KIT_API_KEY as string,
	},
};
