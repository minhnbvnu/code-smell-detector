function primitiveToHTML(schema) {
      var html = '<span class="propType">';
      var type = schema.type || 'object';

      if (schema.$ref) {
        html += addReference(schema, simpleRef(schema.$ref));
      } else if (type === 'object') {
        if (!_.isUndefined(schema.properties)) {
          html += addReference(schema);
        } else {
          html += 'object';
        }
      } else if (type === 'array') {
        html += 'Array[';

        if (_.isArray(schema.items)) {
          html += _.map(schema.items, addReference).join(',');
        } else if (_.isPlainObject(schema.items)) {
          if (_.isUndefined(schema.items.$ref)) {
            if (!_.isUndefined(schema.items.type) && _.indexOf(['array', 'object'], schema.items.type) === -1) {
              html += schema.items.type;
            } else {
              html += addReference(schema.items);
            }
          } else {
            html += addReference(schema.items, simpleRef(schema.items.$ref));
          }
        } else {
          console.log('Array type\'s \'items\' schema is not an array or an object, cannot process');
          html += 'object';
        }

        html += ']';
      } else {
        html += schema.type;
      }

      html += '</span>';

      return html;
    }