function searchItems() {
            	var searchString = search_model.value(),
                	subject = config.search.caseSensitive ? searchString : searchString.toLowerCase();

                if (searchString === '') {
                    if (searchString !== previousValue) {
                        restoreItems();
					} else {
                        fm.warning(lg('search_string_empty'));
					}
                    return;
                }

                if (config.search.recursive) {
                    // recursive search with server-side request
                    var targetPath = model.currentPath();
                    var folderLoader = new FolderAjaxLoader(targetPath);

                    folderLoader
                        .setPreloader(model.itemsModel.getPreloader())
                        .setDataHandler(function (dataObject, targetPath) {
                            var resourceObjects = [];

                            if (config.search.caseSensitive) {
                                $.each(dataObject, function (i, resourceObject) {
                                    if (resourceObject.attributes.name.indexOf(subject) === 0) {
                                        resourceObjects.push(resourceObject);
                                    }
                                });
                            } else {
                                resourceObjects = dataObject;
                            }

                            var items = model.itemsModel.createItems(resourceObjects);
                            model.itemsModel.setItemsList(items);
                            search_model.isRendered(true);
                        })
                        .load(function () {
                            return seekFolder(targetPath, searchString);
                        });
                } else {
                    // client-side search in the currently open folder
                    $.each(model.itemsModel.objects(), function (i, itemObject) {
                        var filename = itemObject.rdo.attributes.name;
                        if (!config.search.caseSensitive) {
                            filename = filename.toLowerCase();
                        }

                        var matchByName = (filename.indexOf(subject) === 0);
                        var visibility = !itemObject.cdo.hiddenByType;
                        visibility = visibility && matchByName;

                        itemObject.cdo.hiddenBySearch = !matchByName;
                        itemObject.visible(visibility);
                    });
                    search_model.isRendered(true);
                }
            }