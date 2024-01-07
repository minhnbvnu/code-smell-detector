function read() {
									reader.read().then(({ done, value }) => {
										if (done) {
											controller.close();
											return;
										}
										loaded += value.byteLength;
										show_progress({ loaded, total })
										controller.enqueue(value);
										read();
									}).catch(error => {
										console.error(error);
										controller.error(error)
									})
								}