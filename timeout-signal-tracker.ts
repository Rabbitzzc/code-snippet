/**
 * 使用场景：期望在某段时间内某个事件是否能够反馈 - 用于一些事件的超时上报....
 */
type Task = {
	stage: string;
	time: number; // 单位是毫秒
	timeoutId?: NodeJS.Timeout;
};

type Callback = (stage: string) => unknown;

export class TimeoutSignalTracker {
	private __tasks: Task[] = [];
	private __onFinishCallback?: Callback;
	private __onTimeoutCallback?: Callback;

	// 添加某个任务
	addStage(stage: string, time: number) {
		const task: Task = { stage, time };
		task.timeoutId = setTimeout(() => {
			this.__onTimeoutCallback?.(task.stage);
		}, task.time);
		this.__tasks.push(task);
	}

	// 添加多个任务
	addStages(taskArray: Task[]) {
		for (const task of taskArray) {
			this.addStage(task.stage, task.time);
		}
	}

	// 当流程完毕以后，需要通知收到了信号，终止逻辑
	receiveSignal(stage: string) {
		const task = this.__tasks.find((task) => task.stage === stage);
		if (!task) {
			// throw new Error(`Task ${stage} does not exist.`);
			return console.warn(`[Signal Tracker] Task ${stage} does not exist.`);
		}

		clearTimeout(task.timeoutId);
		this.__tasks = this.__tasks.filter((t) => t.stage !== stage);
		this.__onFinishCallback?.(stage);
	}

	// 清除所有定时器
	dispose() {
		for (const task of this.__tasks) {
			clearTimeout(task.timeoutId);
		}
		this.__tasks = [];
		this.__onTimeoutCallback = undefined;
		this.__onFinishCallback = undefined;
	}

	// 注册任务完成时的回调函数
	onFinish(callback: Callback) {
		this.__onFinishCallback = callback;
	}

	// 注册任务超时的回调函数
	onTimeout(callback: Callback) {
		this.__onTimeoutCallback = callback;
	}

	getTasks() {
		return this.__tasks;
	}

	isTaskFinished(stage: string) {
		return !this.__tasks.some((task) => task.stage === stage);
	}
}
