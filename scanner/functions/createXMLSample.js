function createXMLSample (name, definition, models, isParam) {
    var prolog = '<?xml version="1.0"?>';

    return formatXml(prolog + createSchemaXML(name, definition, models, { isParam: isParam } ));
  }