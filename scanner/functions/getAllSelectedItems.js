function getAllSelectedItems() {
            var selectedData = [];
            var selectedIds = getAllSelectedIds();
            selectedIds.forEach(function (id) {
                selectedData.push(self.getItemById(id));
            });
            return selectedData;
        }