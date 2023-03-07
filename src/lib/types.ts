import type { Subscriber, Unsubscriber } from 'svelte/store';

export type theme = {
	danger: string;
	success: string;
	warning: string;
	info: string;
	default: string;
};

export type boxItem = {
	6: any;
	id: string;
	source: string[];
	selectedSource: string;
	isPrimaryAudioSource: boolean;
};

export type exportItem = {
	source: string;
	x_pos: number;
	y_pos: number;
	audio: boolean;
};

export type notification = {
	subscribe: (this: void, run: Subscriber<any>, Invalidate: any) => Unsubscriber;
	send: (
		message: string | undefined,
		type: string | undefined,
		timeout: number | undefined
	) => void;
	default: (msg: string | undefined, timeout: number | undefined) => void;
	danger: (msg: string | undefined, timeout: number | undefined) => void;
	warning: (msg: string | undefined, timeout: number | undefined) => void;
	info: (msg: string | undefined, timeout: number | undefined) => void;
	success: (msg: string | undefined, timeout: number | undefined) => void;
};
