# 工位小憩接口文档

本文档描述小程序页面当前依赖的业务接口。现阶段实现使用 `services/mock.ts` 返回 mock 数据；接入微信云开发时，保持入参和返回结构不变，把 `services/` 内部替换为云数据库或云函数调用即可。

## 通用约定

- 时间格式：日期使用 `YYYY-MM-DD`，完整时间使用 ISO 8601 字符串。
- 任务类型：`water` 喝水，`eye` 护眼，`stand` 站立，`toilet` 如厕，`brush` 刷牙。
- MVP 必做：`water`、`eye`、`stand`。`toilet`、`brush` 可先展示 mock，正式提醒可延期。
- 错误返回建议统一为 `{ code: string; message: string; requestId?: string }`。

## 1. 首页仪表盘

### `getHomeDashboard`

用途：获取首页倒计时、今日概览和动作指导数据。

请求参数：

```ts
interface GetHomeDashboardRequest {
  date?: string;
}
```

返回：

```ts
interface HomeDashboard {
  currentTask: TaskProgress;
  tasks: TaskProgress[];
  guide: ActionGuide;
  healthScore: string;
}
```

字段说明：

- `currentTask`：当前倒计时任务。
- `tasks`：今日所有任务进度。
- `guide`：提醒触发后的 Bottom Sheet 指导内容。
- `healthScore`：首页副标题文案。

## 2. 打卡

### `createCheckin`

用途：用户提前完成任务或在提醒后确认完成。

请求参数：

```ts
interface CreateCheckinRequest {
  taskType: 'water' | 'eye' | 'stand' | 'toilet' | 'brush';
  source: 'manual' | 'reminder';
  checkedAt?: string;
}
```

返回：

```ts
interface CheckinRecord {
  id: string;
  taskType: string;
  checkedAt: string;
  source: 'manual' | 'reminder';
}
```

后续云开发建议：

- 写入 `checkins` 集合。
- 更新或异步聚合 `daily_stats` 集合。
- 返回下一次提醒时间，便于页面立即刷新倒计时。

## 3. 提醒控制

### `getReminderTasks`

用途：获取用户已配置的提醒任务。

返回：

```ts
interface ReminderTask {
  id: string;
  title: string;
  description: string;
  intervalMinutes: number;
  dailyTarget: number;
  status: 'active' | 'paused' | 'disabled';
  nextReminderAt?: string;
}
```

### `pauseAllReminders`

用途：暂停所有提醒。

请求参数：

```ts
interface PauseAllRemindersRequest {
  until?: string;
  reason?: 'manual' | 'focus_mode' | 'off_work';
}
```

返回：`void`

### `resumeAllReminders`

用途：恢复所有提醒。

请求参数：

```ts
interface ResumeAllRemindersRequest {
  resumedAt?: string;
}
```

返回：`void`

## 4. 数据页

### `getStatsDashboard`

用途：获取趋势图、今日统计、打卡日历和成就摘要。

请求参数：

```ts
interface GetStatsDashboardRequest {
  range: '7d' | '30d' | 'custom';
  startDate?: string;
  endDate?: string;
}
```

返回：

```ts
interface StatsDashboard {
  activeRange: '7天' | '30天' | '自定义';
  dateRangeLabel: string;
  trends: TrendDay[];
  todayTasks: TaskProgress[];
  calendarMonth: string;
  calendarDays: CalendarDay[];
  achievements: Achievement[];
}
```

## 5. 设置页

### `getSettingsDashboard`

用途：获取工作时间、提醒频率、开关状态、专注模式和通知权限提示。

返回：

```ts
interface SettingsDashboard {
  workTimeLabel: string;
  workTimeNote: string;
  reminderRows: SettingsReminderRow[];
  focusLabel: string;
  focusNote: string;
  notificationNote: string;
}
```

### `saveUserSettings`

用途：保存用户设置。

请求参数：

```ts
interface UserSettings {
  workTime: { start: string; end: string };
  focusTimes: Array<{ start: string; end: string }>;
  reminderPreferences: Array<{
    taskType: string;
    enabled: boolean;
    intervalMinutes: number;
  }>;
  sound: 'default' | 'nature' | 'bell' | 'silent';
  vibration: 'off' | 'light' | 'strong';
}
```

返回：保存后的 `UserSettings`。

## 6. 我的页

### `getAchievementsDashboard`

用途：获取成就徽章页面数据。

返回：

```ts
interface AchievementsDashboard {
  earnedCount: number;
  headline: string;
  tabs: Array<'全部' | '已获得' | '未获得'>;
  activeTab: '全部' | '已获得' | '未获得';
  achievements: Array<{
    name: string;
    condition: string;
    icon: string;
    earned: boolean;
  }>;
}
```

## 7. 我的页

### `getProfileDashboard`

用途：获取个人信息和菜单入口。

返回：

```ts
interface ProfileDashboard {
  nickname: string;
  subtitle: string;
  avatarText: string;
  infoRows: Array<{ label: string; value: string }>;
  menuItems: Array<{ title: string; icon: string }>;
}
```

## 8. 订阅消息

### `requestReminderSubscription`

用途：请求微信订阅消息授权。

请求参数：

```ts
interface RequestReminderSubscriptionRequest {
  templateIds: string[];
}
```

返回：

```ts
interface SubscriptionResult {
  acceptedTemplateIds: string[];
  rejectedTemplateIds: string[];
}
```

### 云函数 `sendReminder`

用途：服务端触发订阅消息提醒。

请求参数：

```ts
interface SendReminderEvent {
  openid: string;
  taskType: string;
  scheduledAt: string;
}
```

返回：

```ts
interface SendReminderResult {
  ok: boolean;
  messageId?: string;
}
```

## 9. 云函数 `aggregateStats`

用途：按天聚合打卡记录，生成趋势和日历数据。

请求参数：

```ts
interface AggregateStatsEvent {
  date: string;
  openid?: string;
}
```

返回：

```ts
interface AggregateStatsResult {
  ok: boolean;
  updatedUsers: number;
}
```
