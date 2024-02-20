function getRelated(model, callback) {
        if (Entity.references == null || Entity.references.length == 0) {
            callback([]);
        }
        let self = this;
        let reference = Entity.references.find(rel => rel.model.table == model.table);
        if (!reference) {
            callback([]);
            return;
        }
        let referenceModel = reference.model;
        let referenceField = reference.referenceField;
        if (reference.direction === "from") {
            referenceModel.findOnRelative(referenceField, self.get("id"), function (results) {
                callback(results);
            })
        }
        else if (reference.direction === "to") {
            referenceModel.findOnRelative(referenceModel.primaryKey, self.get(referenceField), function (results) {
                callback(results);
            })
        }

    }