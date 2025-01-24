type WorkerTrigger = (() => void) | (() => Promise<void>)

export class Worker {
    _timer: Timer | null = null

    trigger: WorkerTrigger

    constructor(trigger: WorkerTrigger) {
        this.trigger = trigger
    }

    start(ms = 1000, triggerFirst = true, waitForTrigger = false): Worker {
        const _trigger = async () => {
            if (waitForTrigger) await this.trigger()
            else this.trigger()
        }

        new Promise<void>(async (resolve, reject) => {
            try {
                if (triggerFirst) await _trigger()

                const _work = async () => {
                    await new Promise<void>((resolve, reject) =>
                        setTimeout(async () => {
                            try {
                                await _trigger()

                                resolve()
                            } catch (e) {
                                reject(e)
                            }
                        }, ms)
                    )

                    _work()
                }

                _work()

                resolve()
            } catch (e) {
                reject(e)
            }
        })

        return this
    }

    stop(): Worker {
        if (this._timer) clearTimeout(this._timer)

        this._timer = null

        return this
    }
}
