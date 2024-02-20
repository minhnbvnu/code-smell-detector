function setItems(data, objectIdProperty) {
            if (objectIdProperty !== undefined) {
                idProperty = objectIdProperty;
            }
            items = filteredItems = data;
            onSetItemsCalled.notify({ idProperty: objectIdProperty, itemCount: items.length }, null, self);
            idxById = new Slick.Map();
            updateIdxById();
            ensureIdUniqueness();
            refresh();
        }