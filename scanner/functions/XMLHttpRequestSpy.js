function XMLHttpRequestSpy() {
						var xhr = new XMLHttpRequest();
						xhr.requestHeaders = {};

						var setRequestHeader = xhr.setRequestHeader;
						xhr.setRequestHeader = function (header, value) {
							xhr.requestHeaders[header] = value;
							return setRequestHeader.apply(xhr, arguments);
						};

						return xhr;
					}