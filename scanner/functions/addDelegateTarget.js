function addDelegateTarget(event, delegatedTarget) {
    Object.defineProperty(event, 'currentTarget', {
        configurable: true,
        enumerable: true,
		get: () => delegatedTarget
    })
}