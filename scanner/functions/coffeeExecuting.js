function coffeeExecuting() {
	var executable = path.basename(process.argv[1]);
	return executable === '_coffee';
}