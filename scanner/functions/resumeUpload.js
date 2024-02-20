function resumeUpload(data) {
						$.blueimp.fileupload.prototype.options.add.call($('#fileupload')[0], e, data);
						data.submit();
					}