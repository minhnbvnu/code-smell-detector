function livingcssPreprocess(context, template, Handlebars) {
  // resolve any declared ahead blocks
  declaredAhead.forEach(ctx => {
    tags.memberof.call(ctx);
  });

  context.allSections.forEach(section => {
    // add any prop to GameObject
    if (section.name === 'GameObject') {
      section.children.push({
        memberof: 'GameObject',
        property: {
          name: '[prop: string]',
          type: 'any'
        }
      });
    }

    // merge parent function parameters onto child
    if (section.extends) {
      let parentSection = context.allSections.find(parent => parent.name === section.extends);
      mergeParam(section, parentSection);
    }

    // normalize params
    if (section.param) {
      section.params = section.param.map(normalizeParams).join(', ');
    }

    // normalize child params
    if (section.children) {
      section.children = section.children.map(child => {
        if (child.param) {
          child.params = child.param.map(normalizeParams).join(', ');
        }

        return child;
      });
    }
  });
}