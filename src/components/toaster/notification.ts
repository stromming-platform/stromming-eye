import type { notification } from "$lib/types"
import { writable, derived, type Writable } from "svelte/store"

const TIMEOUT = 3000

// type innerNotification = {
//     state: [],
//     id: string|undefined,
//     type: string|undefined,
//     message: string|undefined,
//     timeout: number|undefined,
// }

// type notificationType = Writable<innerNotification>

function createNotificationStore (timeout: number) {
    const _notifications: Writable<any[]> = writable([])

    function send (message: string|undefined, type = "default", timeout: number|undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout }]
        })
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
		default: (msg: string|undefined, timeout: number|undefined) => send(msg, "default", timeout),
        danger: (msg: string|undefined, timeout: number|undefined) => send(msg, "danger", timeout),
        warning: (msg: string|undefined, timeout: number|undefined) => send(msg, "warning", timeout),
        info: (msg: string|undefined, timeout: number|undefined) => send(msg, "info", timeout),
        success: (msg: string|undefined, timeout: number|undefined) => send(msg, "success", timeout),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications: notification = createNotificationStore(TIMEOUT)