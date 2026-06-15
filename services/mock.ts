import type {
  AchievementsDashboard,
  HomeDashboard,
  ProfileDashboard,
  SettingsDashboard,
  StatsDashboard,
  TaskProgress
} from '../models/dashboard';
import type { DailyStats } from '../models/stats';
import type { ReminderTask, ReminderTaskType } from '../models/reminder';
import { DEFAULT_SETTINGS } from '../models/settings';
import { addMinutes, formatDate } from '../utils/time';

type TaskMeta = {
  title: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
  dailyTarget: number;
  hint: string;
  actionLabel: string;
};

export const TASK_META: Record<ReminderTaskType, TaskMeta> = {
  water: {
    title: '喝水',
    description: '喝口水吧，身体也需要补充能量。',
    icon: '💧',
    color: '#2f7bff',
    lightColor: '#dce9ff',
    dailyTarget: 8,
    hint: '建议每次 200ml 温水',
    actionLabel: '已喝水'
  },
  stand: {
    title: '站立活动',
    description: '起身活动一下，放松肩颈和腰背。',
    icon: '🚶',
    color: '#ff8a2a',
    lightColor: '#ffe7d1',
    dailyTarget: 6,
    hint: '扩胸拉伸 15 秒',
    actionLabel: '已活动'
  },
  eye: {
    title: '护眼休息',
    description: '望向远方 20 秒，让眼睛休息一下。',
    icon: '👁',
    color: '#43c878',
    lightColor: '#d9f5e5',
    dailyTarget: 6,
    hint: '20-20-20 护眼法则',
    actionLabel: '已护眼'
  },
  toilet: {
    title: '上厕所',
    description: '工作再忙，也别让膀胱加班。',
    icon: '🚻',
    color: '#8b6cff',
    lightColor: '#e8e1ff',
    dailyTarget: 5,
    hint: '避免长时间憋尿',
    actionLabel: '已如厕'
  },
  brush: {
    title: '刷牙',
    description: '用巴氏刷牙法认真清洁 2 分钟。',
    icon: '🦷',
    color: '#ffbd24',
    lightColor: '#fff1c2',
    dailyTarget: 2,
    hint: '早晚各一次',
    actionLabel: '已刷牙'
  }
};

const MOCK_PROGRESS: Record<ReminderTaskType, Pick<TaskProgress, 'completed' | 'remainingText' | 'nextReminderLabel'>> = {
  water: {
    completed: 3,
    remainingText: '15:30',
    nextReminderLabel: '下次 15:30'
  },
  stand: {
    completed: 2,
    remainingText: '25:30',
    nextReminderLabel: '下次 25:30'
  },
  eye: {
    completed: 2,
    remainingText: '05:30',
    nextReminderLabel: '下次 05:30'
  },
  toilet: {
    completed: 1,
    remainingText: '55:30',
    nextReminderLabel: '下次 55:30'
  },
  brush: {
    completed: 1,
    remainingText: '21:30',
    nextReminderLabel: '晚上 21:30'
  }
};

export function createTaskProgressList(): TaskProgress[] {
  return DEFAULT_SETTINGS.reminderPreferences.map((preference) => {
    const meta = TASK_META[preference.taskType];
    const progress = MOCK_PROGRESS[preference.taskType];
    const progressPercent = Math.min(Math.round((progress.completed / meta.dailyTarget) * 100), 100);

    return {
      taskType: preference.taskType,
      title: meta.title,
      icon: meta.icon,
      color: meta.color,
      lightColor: meta.lightColor,
      completed: progress.completed,
      target: meta.dailyTarget,
      progressPercent,
      remainingText: progress.remainingText,
      nextReminderLabel: progress.nextReminderLabel,
      intervalLabel: preference.taskType === 'brush' ? '早晚各一次' : `每 ${preference.intervalMinutes} 分钟`,
      hint: meta.hint,
      actionLabel: meta.actionLabel,
      enabled: preference.enabled
    };
  });
}

export function getMockReminderTasks(): ReminderTask[] {
  const now = new Date();

  return DEFAULT_SETTINGS.reminderPreferences.map((preference) => {
    const meta = TASK_META[preference.taskType];

    return {
      id: preference.taskType,
      title: meta.title,
      description: meta.description,
      intervalMinutes: preference.intervalMinutes,
      dailyTarget: meta.dailyTarget,
      status: preference.enabled ? 'active' : 'disabled',
      nextReminderAt: addMinutes(now, preference.intervalMinutes).toISOString()
    };
  });
}

export function getMockDailyStats(): DailyStats {
  return {
    date: formatDate(new Date()),
    streakDays: 7,
    tasks: createTaskProgressList().map((task) => ({
      taskType: task.taskType,
      completed: task.completed,
      target: task.target
    }))
  };
}

export function createHomeDashboard(): HomeDashboard {
  const tasks = createTaskProgressList();

  return {
    currentTask: tasks[0],
    tasks,
    healthScore: '好习惯 · 好身体 · 好状态',
    guide: {
      taskType: 'eye',
      title: '该让眼睛休息一下啦！',
      subtitle: '20-20-20 护眼法则',
      heroText: '看向 6 米外 20 秒',
      durationLabel: '20s',
      steps: [
        {
          title: '向远眺望',
          detail: '看向 6 米外 20 秒',
          icon: '👁'
        },
        {
          title: '用力眨眼',
          detail: '快速眨眼 10 次',
          icon: '〰'
        },
        {
          title: '热敷双眼',
          detail: '搓热双手敷眼 15 秒',
          icon: '🙌'
        }
      ]
    }
  };
}

export function createStatsDashboard(): StatsDashboard {
  const tasks = createTaskProgressList();
  const primaryTasks = tasks.slice(0, 4);

  return {
    activeRange: '7天',
    dateRangeLabel: '6.09 - 6.15',
    trends: [
      makeTrendDay('6.09', [6, 3, 4, 2]),
      makeTrendDay('6.10', [8, 5, 5, 3]),
      makeTrendDay('6.11', [7, 5, 6, 2]),
      makeTrendDay('6.12', [8, 6, 5, 4]),
      makeTrendDay('6.13', [6, 5, 4, 3]),
      makeTrendDay('6.14', [7, 6, 5, 3]),
      makeTrendDay('6.15', [8, 5, 6, 4])
    ],
    todayTasks: tasks,
    primaryTasks,
    calendarMonth: '2026年6月',
    calendarDays: buildCalendarDays(),
    achievements: [
      {
        name: '久坐终结者',
        condition: '连续站立 7 天',
        icon: '🏅',
        earned: true
      },
      {
        name: '护眼神仙',
        condition: '护眼达标 30 天',
        icon: '👁',
        earned: true
      },
      {
        name: '吨吨吨达人',
        condition: '单日喝水 8 次',
        icon: '💧',
        earned: true
      }
    ]
  };
}

export function createSettingsDashboard(): SettingsDashboard {
  return {
    workTimeLabel: `${DEFAULT_SETTINGS.workTime.start} - ${DEFAULT_SETTINGS.workTime.end}`,
    workTimeNote: '非工作时间将自动静默',
    reminderRows: DEFAULT_SETTINGS.reminderPreferences.map((preference) => {
      const meta = TASK_META[preference.taskType];

      return {
        taskType: preference.taskType,
        title: `${meta.title}提醒`,
        icon: meta.icon,
        color: meta.color,
        intervalLabel: preference.taskType === 'brush' ? '早晚各一次' : `每 ${preference.intervalMinutes} 分钟`,
        enabled: preference.enabled
      };
    }),
    focusLabel: '专注模式（免打扰）',
    focusNote: '在开会、看视频、玩游戏时暂停提醒',
    notificationNote: '去开启服务通知，确保及时提醒'
  };
}

export function createAchievementsDashboard(): AchievementsDashboard {
  return {
    earnedCount: 12,
    headline: '继续加油，解锁更多成就吧！',
    tabs: ['全部', '已获得', '未获得'],
    activeTab: '全部',
    achievements: [
      { name: '久坐终结者', condition: '连续站立 7 天', icon: '🏃', earned: true },
      { name: '护眼神仙', condition: '护眼达标 30 天', icon: '👁', earned: true },
      { name: '吨吨吨达人', condition: '单日喝水 8 次', icon: '💧', earned: true },
      { name: '早睡早起', condition: '连续早晚刷牙 7 天', icon: '🌙', earned: true },
      { name: '自律之星', condition: '连续打卡 30 天', icon: '⭐', earned: true },
      { name: '健康先锋', condition: '累计打卡 100 天', icon: '★', earned: false },
      { name: '不服就干', condition: '连续站立 30 天', icon: '☆', earned: false },
      { name: '水润人生', condition: '连续喝水 30 天', icon: '✦', earned: false },
      { name: '健康大师', condition: '累计打卡 365 天', icon: '✧', earned: false }
    ]
  };
}

export function createProfileDashboard(): ProfileDashboard {
  return {
    nickname: '打工人小明',
    subtitle: '健康生活，快乐工作',
    avatarText: '明',
    infoRows: [
      { label: '性别', value: '男' },
      { label: '生日', value: '1995-05-20' },
      { label: '身高', value: '175 cm' },
      { label: '体重', value: '65 kg' },
      { label: '每日建议饮水量', value: '1800 ml' }
    ],
    menuItems: [
      { title: '声音与震动设置', icon: '🔊' },
      { title: '意见反馈', icon: '✉' },
      { title: '关于我们', icon: 'ⓘ' }
    ]
  };
}

function makeTrendDay(dateLabel: string, values: [number, number, number, number]) {
  const [water, stand, eye, toilet] = values;
  const max = 8;

  return {
    dateLabel,
    bars: [
      makeTrendBar('water', water, max),
      makeTrendBar('stand', stand, max),
      makeTrendBar('eye', eye, max),
      makeTrendBar('toilet', toilet, max)
    ]
  };
}

function makeTrendBar(taskType: ReminderTaskType, value: number, max: number) {
  return {
    taskType,
    value,
    height: Math.max(Math.round((value / max) * 150), 18),
    color: TASK_META[taskType].color
  };
}

function buildCalendarDays() {
  const checkedDays = new Set([1, 2, 3, 4, 8, 9, 10, 12, 14, 15]);
  const days = Array.from({ length: 30 }, (_, index) => {
    const label = `${index + 1}`;

    return {
      id: `2026-06-${label.padStart(2, '0')}`,
      label,
      isCurrentMonth: true,
      isChecked: checkedDays.has(index + 1),
      isToday: index + 1 === 15
    };
  });

  return [
    ...days,
    ...Array.from({ length: 5 }, (_, index) => ({
      id: `2026-07-${`${index + 1}`.padStart(2, '0')}`,
      label: `${index + 1}`,
      isCurrentMonth: false,
      isChecked: false,
      isToday: false
    }))
  ];
}
