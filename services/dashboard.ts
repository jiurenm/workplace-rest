import type {
  AchievementsDashboard,
  HomeDashboard,
  ProfileDashboard,
  SettingsDashboard,
  StatsDashboard
} from '../models/dashboard';
import {
  createAchievementsDashboard,
  createHomeDashboard,
  createProfileDashboard,
  createSettingsDashboard,
  createStatsDashboard
} from './mock';

export async function getHomeDashboard(): Promise<HomeDashboard> {
  return createHomeDashboard();
}

export async function getStatsDashboard(): Promise<StatsDashboard> {
  return createStatsDashboard();
}

export async function getSettingsDashboard(): Promise<SettingsDashboard> {
  return createSettingsDashboard();
}

export async function getAchievementsDashboard(): Promise<AchievementsDashboard> {
  return createAchievementsDashboard();
}

export async function getProfileDashboard(): Promise<ProfileDashboard> {
  return createProfileDashboard();
}
