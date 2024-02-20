function checkAndScrubDefinition(fieldName, definition, options, allKeys) {
  if (!definition.type) throw new Error(`${fieldName} key is missing "type"`);

  // Validate the field definition
  Object.keys(definition).forEach((key) => {
    if (schemaDefinitionOptions.indexOf(key) === -1) {
      throw new Error(`Invalid definition for ${fieldName} field: "${key}" is not a supported property`);
    }
  });

  // Make sure the `type`s are OK
  let couldBeArray = false;
  definition.type.definitions.forEach(({ type }) => {
    if (!type) throw new Error(`Invalid definition for ${fieldName} field: "type" option is required`);

    if (Array.isArray(type)) {
      throw new Error(`Invalid definition for ${fieldName} field: "type" may not be an array. Change it to Array.`);
    }

    if (type.constructor === Object && isEmptyObject(type)) {
      throw new Error(`Invalid definition for ${fieldName} field: "type" may not be an object. Change it to Object`);
    }

    if (type === Array) couldBeArray = true;

    if (SimpleSchema.isSimpleSchema(type)) {
      Object.keys(type._schema).forEach((subKey) => {
        const newKey = `${fieldName}.${subKey}`;
        if (allKeys.has(newKey)) {
          throw new Error(`The type for "${fieldName}" is set to a SimpleSchema instance that defines "${newKey}", but the parent SimpleSchema instance also tries to define "${newKey}"`);
        }
      });
    }
  });

  // If at least one of the possible types is Array, then make sure we have a
  // definition for the array items, too.
  if (couldBeArray && !allKeys.has(`${fieldName}.$`)) {
    throw new Error(`"${fieldName}" is Array type but the schema does not include a "${fieldName}.$" definition for the array items"`);
  }

  // defaultValue -> autoValue
  // We support defaultValue shortcut by converting it immediately into an
  // autoValue.

  if ('defaultValue' in definition) {
    if ('autoValue' in definition && !definition.autoValue.isDefault) {
      console.warn(`SimpleSchema: Found both autoValue and defaultValue options for "${fieldName}". Ignoring defaultValue.`);
    } else {
      if (fieldName.endsWith('.$')) {
        throw new Error('An array item field (one that ends with ".$") cannot have defaultValue.');
      }
      definition.autoValue = getDefaultAutoValueFunction(definition.defaultValue);
      definition.autoValue.isDefault = true;
    }
  }

  // REQUIREDNESS
  if (fieldName.endsWith('.$')) {
    definition.optional = true;
  } else if (!Object.prototype.hasOwnProperty.call(definition, 'optional')) {
    if (Object.prototype.hasOwnProperty.call(definition, 'required')) {
      if (typeof definition.required === 'function') {
        // Save a reference to the `required` fn because
        // we are going to delete it from `definition` below
        const requiredFn = definition.required;
        definition.optional = function optional(...args) {
          return !requiredFn.apply(this, args);
        };
      } else {
        definition.optional = !definition.required;
      }
    } else {
      definition.optional = (options.requiredByDefault === false);
    }
  }

  delete definition.required;

  // LABELS
  if (!Object.prototype.hasOwnProperty.call(definition, 'label')) {
    if (options.defaultLabel) {
      definition.label = options.defaultLabel;
    } else if (SimpleSchema.defaultLabel) {
      definition.label = SimpleSchema.defaultLabel;
    } else {
      definition.label = inflectedLabel(fieldName, options.humanizeAutoLabels);
    }
  }
}