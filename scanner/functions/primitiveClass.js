constructor () {
      super();
      this.defaultComponentsFromPrimitive = definition.defaultComponents || definition.defaultAttributes || {};
      this.deprecated = definition.deprecated || null;
      this.deprecatedMappings = definition.deprecatedMappings || {};
      this.mappings = mappings;

      if (definition.deprecated) { console.warn(definition.deprecated); }
      this.resolveMappingCollisions();
    }