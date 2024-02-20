function VantComponent(vantOptions = {}) {
  const options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses',
  });
  const { relation } = vantOptions;
  if (relation) {
    makeRelation(options, vantOptions, relation);
  }
  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');
  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);
  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }
  if (options.properties) {
    Object.keys(options.properties).forEach((name) => {
      if (Array.isArray(options.properties[name])) {
        // miniprogram do not allow multi type
        options.properties[name] = null;
      }
    });
  }
  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true,
  };
  Component(options);
}