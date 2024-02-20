function setLinksBehavior() {
                    // add onClick events to local .md file links (to perform AJAX previews)
                    $containerElement.find('a').each(function() {
                        var href = $(this).attr('href'),
                            editor = fmModel.previewModel.editor;

                        if (editor.enabled() && editor.isInteractive()) {
                            // prevent user from losing unsaved changes in preview mode
                            // in case of clicking on a link that jumps off the page
                            $(this).off('click');
                            $(this).on('click', function () {
                                return false; // prevent onClick event
                            });
                        } else {
                            if (href.search('://') !== -1 || startsWith(href, 'mailto:')) {
                                return; // do nothing
                            }

                            if (isMarkdownFile(href)) {
                                // open file in preview mode for clicked link
                                $(this).on('click', function (e) {
                                    getItemInfo(href).then(function(response) {
                                        if(response.data) {
                                            getDetailView(response.data);
                                        }
                                    });

                                    return false; // prevent onClick event
                                });
                            }
                        }
                    });
				}