import type { UserSettings } from '../models/settings';
import { DEFAULT_SETTINGS } from '../models/settings';

export async function getUserSettings(): Promise<UserSettings> {
  return DEFAULT_SETTINGS;
}

export async function saveUserSettings(settings: UserSettings): Promise<UserSettings> {
  return settings;
}
