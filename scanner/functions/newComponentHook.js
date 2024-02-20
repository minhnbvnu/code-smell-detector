function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([
		propsHook,
		this.componentWillReceiveProps || 'componentWillReceiveProps'
	]);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}