function generateMessage(dir) {
		return 'This directory is generated from the "/app/' + dir + '" and "/app/theme/<name>/' + dir + '" directories.\n\n' +
			'Do not modify any files in this directory. Your changes will be lost on next build.\n\n' +
			'Please make sure "/' + dir + '" is added to your version control\'s ignore list (i.e. .gitignore).';
	}