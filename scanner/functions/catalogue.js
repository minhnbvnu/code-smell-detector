function catalogue(subdir) {
							subdir = path.resolve(dir, subdir);

							return glob
								.sync('**/*.js?(.map)', { cwd: subdir })
								.sort()
								.map(name => {
									var contents = fs
										.readFileSync(path.resolve(subdir, name), 'utf-8')
										.replace(/\r\n/g, '\n')
										.trim();

									if (path.extname(name) === '.map') {
										contents = JSON.parse(contents);
									}

									return { name, contents };
								});
						}