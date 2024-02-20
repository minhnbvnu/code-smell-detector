function formatPrimitive(ctx, value) {
      switch (typeof value) {
        case 'undefined':
          return ctx.stylize('undefined', 'undefined');

        case 'string':
          var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                   .replace(/'/g, "\\'")
                                                   .replace(/\\"/g, '"') + '\'';
          return ctx.stylize(simple, 'string');

        case 'number':
          return ctx.stylize('' + value, 'number');

        case 'boolean':
          return ctx.stylize('' + value, 'boolean');
      }
      // For some reason typeof null is "object", so special case here.
      if (value === null) {
        return ctx.stylize('null', 'null');
      }
    }