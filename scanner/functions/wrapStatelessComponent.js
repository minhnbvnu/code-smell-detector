function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}