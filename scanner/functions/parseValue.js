function parseValue(value) {
  if (value.kind === 'stringValue') {
    if (!_.isEmpty(value.stringValue)) {
      return value.stringValue;
    }
  } else if (value.kind === 'numberValue') {
    return value.numberValue;
  } else if (value.kind === 'structValue' ) {
    return parseFields(value.structValue.fields);
  } else if (value.kind === 'listValue') {
    return value.listValue.values.map(parseValue);
  } else {
    // eslint-disable-next-line no-console
    console.log('Warning: incorrectly handled dialogflow.com response type:');
    // eslint-disable-next-line no-console
    console.log(value);
  }
}