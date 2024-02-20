function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}