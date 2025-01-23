type WorkerTrigger = (() => void) | (() => Promise<void>)

export class Worker {
    _started: boolean = false

    trigger: WorkerTrigger

    constructor(trigger: WorkerTrigger) {
        this.trigger = trigger
    }

    start(ms = 1000, triggerFirst = true, waitForTrigger = false): Worker {
        this._started = true

        new Promise<void>(async (resolve, reject) => {
            try {
                if (triggerFirst) await this.trigger()

                while (this._started) {
                    await new Promise((resolve) => setTimeout(resolve, ms))

                    if (!this._started) break

                    if (waitForTrigger) await this.trigger()
                    else this.trigger()
                }

                resolve()
            } catch (e) {
                reject(e)
            }
        })

        return this
    }

    stop(): Worker {
        this._started = false

        return this
    }
}
