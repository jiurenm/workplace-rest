import type { ReminderTaskType } from './reminder';

export interface GuideStep {
  title: string;
  detail: string;
  icon: string;
}

export interface ActionGuide {
  taskType: ReminderTaskType;
  title: string;
  subtitle: string;
  heroText: string;
  durationLabel: string;
  steps: GuideStep[];
}

export interface TaskProgress {
  taskType: ReminderTaskType;
  title: string;
  icon: string;
  color: string;
  lightColor: string;
  completed: number;
  target: number;
  progressPercent: number;
  remainingText: string;
  nextReminderLabel: string;
  intervalLabel: string;
  hint: string;
  actionLabel: string;
  enabled: boolean;
}

export interface HomeDashboard {
  currentTask: TaskProgress;
  tasks: TaskProgress[];
  guide: ActionGuide;
  healthScore: string;
}

export interface TrendBar {
  taskType: ReminderTaskType;
  value: number;
  height: number;
  color: string;
}

export interface TrendDay {
  dateLabel: string;
  bars: TrendBar[];
}

export interface CalendarDay {
  id: string;
  label: string;
  isCurrentMonth: boolean;
  isChecked: boolean;
  isToday: boolean;
}

export interface Achievement {
  name: string;
  condition: string;
  icon: string;
  earned: boolean;
}

export interface AchievementsDashboard {
  earnedCount: number;
  headline: string;
  tabs: Array<'全部' | '已获得' | '未获得'>;
  activeTab: '全部' | '已获得' | '未获得';
  achievements: Achievement[];
}

export interface StatsDashboard {
  activeRange: '7天' | '30天' | '自定义';
  dateRangeLabel: string;
  trends: TrendDay[];
  todayTasks: TaskProgress[];
  primaryTasks: TaskProgress[];
  calendarMonth: string;
  calendarDays: CalendarDay[];
  achievements: Achievement[];
}

export interface SettingsReminderRow {
  taskType: ReminderTaskType;
  title: string;
  icon: string;
  color: string;
  intervalLabel: string;
  enabled: boolean;
}

export interface SettingsDashboard {
  workTimeLabel: string;
  workTimeNote: string;
  reminderRows: SettingsReminderRow[];
  focusLabel: string;
  focusNote: string;
  notificationNote: string;
}

export interface ProfileInfoRow {
  label: string;
  value: string;
}

export interface ProfileMenuItem {
  title: string;
  icon: string;
}

export interface ProfileDashboard {
  nickname: string;
  subtitle: string;
  avatarText: string;
  infoRows: ProfileInfoRow[];
  menuItems: ProfileMenuItem[];
}
