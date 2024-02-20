function createXMLExample(schema, config) {
            var json = sampleXmlFromSchema(schema, config);
            if (!json) {
                return
            }
            return (0, _xml2.default)(json, {
                declaration: true,
                indent: "\t"
            })
        }