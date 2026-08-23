import { tr } from './tr';
import { en } from './en';
import { Language, LocaleDictionary } from './types';

export * from './types';
export { tr, en };

export const LOCALES: Record<Language, LocaleDictionary> = {
  tr,
  en
};
