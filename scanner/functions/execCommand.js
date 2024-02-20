function execCommand(currentCommand) {
	exec(currentCommand, (error, response) => {
		if (error && error.code === 127) U.die('\n::PurgeTSS:: First install purgetss globally using: [sudo] npm i purgetss -g');
		return console.log(response);
	});
}