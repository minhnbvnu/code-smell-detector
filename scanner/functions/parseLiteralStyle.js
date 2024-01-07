function parseLiteralStyle(style) {
  /**
   * @type {import("../expr/gpu.js").CompilationContext}
   */
  const vertContext = {
    inFragmentShader: false,
    properties: {},
    variables: {},
    functions: {},
    style,
  };

  /**
   * @type {import("../expr/gpu.js").CompilationContext}
   */
  const fragContext = {
    inFragmentShader: true,
    variables: vertContext.variables,
    properties: {},
    functions: {},
    style,
  };

  const builder = new ShaderBuilder();

  /** @type {Object<string,import("../webgl/Helper").UniformValue>} */
  const uniforms = {};

  if ('icon-src' in style) {
    parseIconProperties(style, builder, uniforms, vertContext, fragContext);
  } else if ('shape-points' in style) {
    parseShapeProperties(style, builder, uniforms, vertContext, fragContext);
  } else if ('circle-radius' in style) {
    parseCircleProperties(style, builder, uniforms, vertContext, fragContext);
  }
  parseStrokeProperties(style, builder, uniforms, vertContext, fragContext);
  parseFillProperties(style, builder, uniforms, vertContext, fragContext);

  if (style.filter) {
    const parsedFilter = expressionToGlsl(
      fragContext,
      style.filter,
      BooleanType,
    );
    builder.setFragmentDiscardExpression(`!${parsedFilter}`);
  }

  // define one uniform per variable
  Object.keys(fragContext.variables).forEach(function (varName) {
    const variable = fragContext.variables[varName];
    const uniformName = uniformNameForVariable(variable.name);
    builder.addUniform(`${getGlslTypeFromType(variable.type)} ${uniformName}`);

    let callback;
    if (variable.type === StringType) {
      callback = () =>
        getStringNumberEquivalent(
          /** @type {string} */ (style.variables[variable.name]),
        );
    } else if (variable.type === ColorType) {
      callback = () =>
        packColor([
          ...asArray(
            /** @type {string|Array<number>} */ (
              style.variables[variable.name]
            ) || '#eee',
          ),
        ]);
    } else if (variable.type === BooleanType) {
      callback = () =>
        /** @type {boolean} */ (style.variables[variable.name]) ? 1.0 : 0.0;
    } else {
      callback = () => /** @type {number} */ (style.variables[variable.name]);
    }
    uniforms[uniformName] = callback;
  });

  // for each feature attribute used in the fragment shader, define a varying that will be used to pass data
  // from the vertex to the fragment shader, as well as an attribute in the vertex shader (if not already present)
  Object.keys(fragContext.properties).forEach(function (propName) {
    const property = fragContext.properties[propName];
    if (!vertContext.properties[propName]) {
      vertContext.properties[propName] = property;
    }
    let type = getGlslTypeFromType(property.type);
    let expression = `a_prop_${property.name}`;
    if (property.type === ColorType) {
      type = 'vec4';
      expression = `unpackColor(${expression})`;
      builder.addVertexShaderFunction(UNPACK_COLOR_FN);
    }
    builder.addVarying(`v_prop_${property.name}`, type, expression);
  });

  // for each feature attribute used in the vertex shader, define an attribute in the vertex shader.
  Object.keys(vertContext.properties).forEach(function (propName) {
    const property = vertContext.properties[propName];
    builder.addAttribute(
      `${getGlslTypeFromType(property.type)} a_prop_${property.name}`,
    );
  });

  const attributes = Object.keys(vertContext.properties).map(
    function (propName) {
      const property = vertContext.properties[propName];
      let callback;
      if (property.evaluator) {
        callback = property.evaluator;
      } else if (property.type === StringType) {
        callback = (feature) =>
          getStringNumberEquivalent(feature.get(property.name));
      } else if (property.type === ColorType) {
        callback = (feature) =>
          packColor([...asArray(feature.get(property.name) || '#eee')]);
      } else if (property.type === BooleanType) {
        callback = (feature) => (feature.get(property.name) ? 1.0 : 0.0);
      } else {
        callback = (feature) => feature.get(property.name);
      }

      return {
        name: property.name,
        size: getGlslSizeFromType(property.type),
        callback,
      };
    },
  );

  // add functions that were collected in the compilation contexts
  for (const functionName in vertContext.functions) {
    builder.addVertexShaderFunction(vertContext.functions[functionName]);
  }
  for (const functionName in fragContext.functions) {
    builder.addFragmentShaderFunction(fragContext.functions[functionName]);
  }

  return {
    builder: builder,
    attributes: attributes.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: {callback: curr.callback, size: curr.size},
      }),
      {},
    ),
    uniforms: uniforms,
  };
}