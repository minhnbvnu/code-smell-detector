function makeFolder(e, ui) {
					var folderName = ui.getInputValue();
					if(!folderName) {
						fm.error(lg('no_foldername'));
						return;
					}

                    buildAjaxRequest('GET', {
                        mode: 'addfolder',
                        path: fmModel.currentPath(),
                        name: folderName
                    }).done(function(response) {
                        if (response.data) {
                            fmModel.addElements(response.data, fmModel.currentPath());

                            ui.closeDialog();
                            if (config.options.showConfirmation) {
                                fm.success(lg('successful_added_folder'));
                            }
                        }
                    }).fail(handleAjaxError);
				}