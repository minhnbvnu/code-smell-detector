function Type$h(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function (name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException$3('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });

      // TODO: Add tag format check.
      this.tag = tag;
      this.kind = options['kind'] || null;
      this.resolve = options['resolve'] || function () {
        return true;
      };
      this.construct = options['construct'] || function (data) {
        return data;
      };
      this.instanceOf = options['instanceOf'] || null;
      this.predicate = options['predicate'] || null;
      this.represent = options['represent'] || null;
      this.defaultStyle = options['defaultStyle'] || null;
      this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException$3('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }