import { YandexApiConfig } from '@/shared/config/yandex';
import axios from 'axios';

export const YandexTranslateClient = axios.create({ baseURL: YandexApiConfig.translate.uri });

YandexTranslateClient.interceptors.request.use(
	config => {
		config.headers.Authorization = `Api-Key ${YandexApiConfig.translate.apiKey}`;
		return config;
	},
	error => Promise.reject(error)
);
