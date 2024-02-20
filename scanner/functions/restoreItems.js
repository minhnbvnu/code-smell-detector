function restoreItems() {
                search_model.clearInput();

                // restore original content of the current folder
                if (config.search.recursive) {
                    model.itemsModel.loadDataList(model.currentPath());
                } else {
                    $.each(model.itemsModel.objects(), function (i, itemObject) {
                        itemObject.cdo.hiddenBySearch = false;
                        itemObject.visible(!itemObject.cdo.hiddenByType);
                    });
                }
            }