function setPromiseHooks() {
    if (promiseHooksSet) {
        return;
    }
    promiseHooksSet = true;
    const init = (promise) => {
        const currentFrame = AsyncContextFrame.current();
        if (!currentFrame.isRoot()) {
            if (typeof promise[asyncContext] !== "undefined") {
                throw new Error("Promise already has async context");
            }
            AsyncContextFrame.attachContext(promise);
            promise['idx'] = promiseIndex++;
        }
    };
    const before = (promise) => {
        const maybeFrame = promise[asyncContext];
        if (maybeFrame) {
            pushAsyncFrame(maybeFrame);
        }
        else {
            pushAsyncFrame(AsyncContextFrame.getRootAsyncContext());
        }
    };
    const after = (promise) => {
        popAsyncFrame();
        if (core.getPromiseState(promise) !== 2) {
            // @ts-ignore promise async context
            promise[asyncContext] = undefined;
        }
    };
    const resolve = (promise) => {
        const currentFrame = AsyncContextFrame.current();
        if (!currentFrame.isRoot() && core.getPromiseState(promise) === 2 &&
            typeof promise[asyncContext] === "undefined") {
            AsyncContextFrame.attachContext(promise);
        }
    };
    core.setPromiseHooks(init, before, after, resolve);
}