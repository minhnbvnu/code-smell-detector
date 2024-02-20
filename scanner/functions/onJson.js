function onJson(err, content) {
					if (err) {
						if (resolveContext.log)
							resolveContext.log(
								descriptionFilePath + " (directory description file): " + err
							);
						else
							err.message =
								descriptionFilePath + " (directory description file): " + err;
						return callback(err);
					}
					callback(null, {
						content: /** @type {JsonObject} */ (content),
						directory,
						path: descriptionFilePath
					});
				}