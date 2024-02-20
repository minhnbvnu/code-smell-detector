function destroyMountNode({ wrapper, mountNode }) {
	wrapper.unmount();
	document.body.removeChild(mountNode);
}