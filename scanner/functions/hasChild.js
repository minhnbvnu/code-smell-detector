function hasChild(children, name) {
	let flag = false;
	flatMapChildren(children, (child) => {
		flag = flag || (child.type && child.type.name === name);
	});
	return flag;
}