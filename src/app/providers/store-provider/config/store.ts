import { configureStore } from '@reduxjs/toolkit';
import type { StateSchema } from './state-schema';
import { textSelectorReducer } from '@/features/text-selection';

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore<StateSchema>({
    reducer: { textSelection: textSelectorReducer },
    preloadedState: initialState,
  });
};
