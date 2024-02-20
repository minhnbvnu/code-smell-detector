function asyncTest(title, func) {
    const cleanup = []
    const onExit = (f) => cleanup.push(f)

    return test(title, async(t) => {
        try {
            await func(t, onExit)
            t.end()
        } catch (e) {
            t.fail('exception')
        } finally {
            for (const f of cleanup) {
                await f()
            }
        }
    })
}