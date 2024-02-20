function createEnv () {
	return Object.assign(process.env, { PATH: `${path.join(process.cwd(), 'bin')}${path.delimiter}${process.env.PATH}`})
}