import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';

export const getPosition = (state: StateSchema) => state.textSelection.position;
