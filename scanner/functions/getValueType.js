function getValueType(value) {
  if (value === undefined) {
    return ValueTypes.undefined;
  } else if (value === null) {
    return ValueTypes.null;
  } else if (typeof value === "string") {
    return ValueTypes.string;
  } else if (typeof value === "number") {
    return ValueTypes.number;
  } else if (typeof value === "boolean") {
    return ValueTypes.boolean;
  } else if (Array.isArray(value)) {
    return ValueTypes.array;
  } else if (value.wrapperName === "Set") {
    return ValueTypes.aws_set;
  } else if (value.constructor.name === "Set") {
    return ValueTypes.set;
  } else if (value.constructor.name === "Map") {
    return ValueTypes.map;
  } else if (value.constructor.name === "Object") {
    return ValueTypes.object;
  } else {
    return ValueTypes.unknown;
  }
}