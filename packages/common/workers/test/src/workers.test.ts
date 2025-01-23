import { test, expect, describe } from 'bun:test'
import { Worker } from '../..'

describe('Workers coordinate their schedule.', () => {
    test('Workers can be triggered.', async () => {
        expect(await new Worker(() => true).trigger()).toBe(true)
    })

    // TODO setTimeout is never fullfilled in bun test (?), so the following code fails in worker and in this scope
    // test('Workers trigger until stopped.', async () => {
    //     const testWorker = async () => {
    //         let count = 0
    //         const worker = new Worker(() => {
    //             count++
    //         })

    //         worker.start(100, false)

    //         return await new Promise<boolean>((resolve, reject) => {
    //             const timer = setTimeout(reject, 1000)

    //             while (count !== 3) {}

    //             worker.stop()

    //             clearTimeout(timer)

    //             resolve(count === 3)
    //         })
    //     }

    //     expect(await testWorker()).toBe(true)
    // })
})
