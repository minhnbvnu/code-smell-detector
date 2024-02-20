function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	let wrap = h(ContextProvider, { context: parentComponent.context }, vnode);
	let renderContainer = render(wrap, container);
	let component = renderContainer._component || renderContainer.base;
	if (callback) callback.call(component, renderContainer);
	return component;
}