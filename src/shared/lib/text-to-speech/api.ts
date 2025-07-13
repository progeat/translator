import { YandexApiConfig } from '@/shared/config/yandex';
import axios from 'axios';

export const YandexSpeechKitClient = axios.create({ baseURL: YandexApiConfig.speechKit.uri });

YandexSpeechKitClient.interceptors.request.use(
	config => {
		config.headers.Authorization = `Api-Key ${YandexApiConfig.speechKit.apiKey}`;
		config.headers['x-folder-id'] = YandexApiConfig.folderId;
		return config;
	},
	error => Promise.reject(error)
);
