function loadDescriptionFile(
	resolver,
	directory,
	filenames,
	oldInfo,
	resolveContext,
	callback
) {
	(function findDescriptionFile() {
		if (oldInfo && oldInfo.directory === directory) {
			// We already have info for this directory and can reuse it
			return callback(null, oldInfo);
		}
		forEachBail(
			filenames,
			/**
			 * @param {string} filename filename
			 * @param {(err?: null|Error, result?: null|Result) => void} callback callback
			 * @returns {void}
			 */
			(filename, callback) => {
				const descriptionFilePath = resolver.join(directory, filename);
				if (resolver.fileSystem.readJson) {
					resolver.fileSystem.readJson(descriptionFilePath, (err, content) => {
						if (err) {
							if (typeof err.code !== "undefined") {
								if (resolveContext.missingDependencies) {
									resolveContext.missingDependencies.add(descriptionFilePath);
								}
								return callback();
							}
							if (resolveContext.fileDependencies) {
								resolveContext.fileDependencies.add(descriptionFilePath);
							}
							return onJson(err);
						}
						if (resolveContext.fileDependencies) {
							resolveContext.fileDependencies.add(descriptionFilePath);
						}
						onJson(null, /** @type {JsonObject} */ (content));
					});
				} else {
					resolver.fileSystem.readFile(descriptionFilePath, (err, content) => {
						if (err) {
							if (resolveContext.missingDependencies) {
								resolveContext.missingDependencies.add(descriptionFilePath);
							}
							return callback();
						}
						if (resolveContext.fileDependencies) {
							resolveContext.fileDependencies.add(descriptionFilePath);
						}

						/** @type {JsonObject | undefined} */
						let json;

						if (content) {
							try {
								json = JSON.parse(content.toString());
							} catch (/** @type {unknown} */ e) {
								return onJson(/** @type {Error} */ (e));
							}
						} else {
							return onJson(new Error("No content in file"));
						}

						onJson(null, json);
					});
				}

				/**
				 * @param {null|Error} [err] error
				 * @param {JsonObject} [content] content
				 * @returns {void}
				 */
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
			},
			/**
			 * @param {null|Error} [err] error
			 * @param {null|Result} [result] result
			 * @returns {void}
			 */
			(err, result) => {
				if (err) return callback(err);
				if (result) {
					return callback(null, result);
				} else {
					const dir = cdUp(directory);
					if (!dir) {
						return callback();
					} else {
						directory = dir;
						return findDescriptionFile();
					}
				}
			}
		);
	})();
}