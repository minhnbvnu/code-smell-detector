function addDefaultMetaSchema(self) {
        var $dataSchema;
        if (self._opts.$data) {
            $dataSchema = require(278) /* ./refs/data.json */;
            self.addMetaSchema($dataSchema, $dataSchema.$id, true);
        }
        if (self._opts.meta === false)
            return;
        var metaSchema = require(277) /* ./refs/json-schema-draft-07.json */;
        if (self._opts.$data)
            metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
        self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
        self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
    }