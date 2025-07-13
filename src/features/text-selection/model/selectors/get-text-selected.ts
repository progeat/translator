import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';

export const getTextSelected = (state: StateSchema) =>
  state.textSelection.textSelected;
