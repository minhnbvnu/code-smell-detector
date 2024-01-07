function getDefs(chalk) {
	  return {
	    keyword: chalk.cyan,
	    capitalized: chalk.yellow,
	    jsx_tag: chalk.yellow,
	    punctuator: chalk.yellow,

	    number: chalk.magenta,
	    string: chalk.green,
	    regex: chalk.magenta,
	    comment: chalk.grey,
	    invalid: chalk.white.bgRed.bold,
	    gutter: chalk.grey,
	    marker: chalk.red.bold
	  };
	}