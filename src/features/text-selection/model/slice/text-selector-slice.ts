import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Position,
  TextSelectionSchema,
} from '../types/text-selection-schema';

const initialState: TextSelectionSchema = {
  textSelected: null,
  position: null,
};

export const textSelectorSlice = createSlice({
  name: 'textSelector',
  initialState,
  reducers: {
    setTextSelected: (state, action: PayloadAction<string | null>) => {
      state.textSelected = action.payload;
    },
    setPosition: (state, action: PayloadAction<Position | null>) => {
      state.position = action.payload;
    },
  },
});

export const { actions: textSelectorActions } = textSelectorSlice;
export const { reducer: textSelectorReducer } = textSelectorSlice;
