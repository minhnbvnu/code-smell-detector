  function primitiveToOptionsHTML(schema, html) {
    var options = '';
    var type = schema.type || 'object';
    var isArray = type === 'array';

    if (isArray) {
      if (_.isPlainObject(schema.items) && !_.isUndefined(schema.items.type)) {
        type = schema.items.type;
      } else {
        type = 'object';
      }
    }

    if (!_.isUndefined(schema.default)) {
      options += optionHtml('Default', schema.default);
    }

    switch (type) {
    case 'string':
      if (schema.minLength) {
        options += optionHtml('Min. Length', schema.minLength);
      }

      if (schema.maxLength) {
        options += optionHtml('Max. Length', schema.maxLength);
      }

      if (schema.pattern) {
        options += optionHtml('Reg. Exp.', schema.pattern);
      }
      break;
    case 'integer':
    case 'number':
      if (schema.minimum) {
        options += optionHtml('Min. Value', schema.minimum);
      }

      if (schema.exclusiveMinimum) {
        options += optionHtml('Exclusive Min.', 'true');
      }

      if (schema.maximum) {
        options += optionHtml('Max. Value', schema.maximum);
      }

      if (schema.exclusiveMaximum) {
        options += optionHtml('Exclusive Max.', 'true');
      }

      if (schema.multipleOf) {
        options += optionHtml('Multiple Of', schema.multipleOf);
      }

      break;
    }

    if (isArray) {
      if (schema.minItems) {
        options += optionHtml('Min. Items', schema.minItems);
      }

      if (schema.maxItems) {
        options += optionHtml('Max. Items', schema.maxItems);
      }

      if (schema.uniqueItems) {
        options += optionHtml('Unique Items', 'true');
      }

      if (schema.collectionFormat) {
        options += optionHtml('Coll. Format', schema.collectionFormat);
      }
    }

    if (_.isUndefined(schema.items)) {
      if (_.isArray(schema.enum)) {
        var enumString;

        if (type === 'number' || type === 'integer') {
          enumString = schema.enum.join(', ');
        } else {
          enumString = '"' + schema.enum.join('", "') + '"';
        }

        options += optionHtml('Enum', enumString);
      }
    }

    if (options.length > 0) {
      html = '<span class="propWrap">' + html + '<table class="optionsWrapper"><tr><th colspan="2">' + type + '</th></tr>' + options + '</table></span>';
    }

    return html;
  }