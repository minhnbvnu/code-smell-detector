function createObjectXML (descriptor) {
    var name = descriptor.name;
    var definition = descriptor.definition;
    var config = descriptor.config;
    var models = descriptor.models;
    var isParam = descriptor.config.isParam;
    var serializedProperties;
    var attrs = [];
    var properties = definition.properties;
    var additionalProperties = definition.additionalProperties;
    var xml = definition.xml;
    var namespace = getNamespace(xml);

    if (namespace) {
      attrs.push(namespace);
    }

    if (!properties && !additionalProperties) { return getErrorMessage(); }

    properties = properties || {};

    serializedProperties = _.map(properties, function (prop, key) {
      var xml, result;

      if (isParam && prop.readOnly) {
        return '';
      }

      xml = prop.xml || {};
      result = createSchemaXML(key, prop, models, config);

      if (xml.attribute) {
        attrs.push(result);
        return '';
      }

      return result;
    }).join('');

    if (additionalProperties) {
      serializedProperties += '<!-- additional elements allowed -->';
    }

    return wrapTag(name, serializedProperties, attrs);
  }