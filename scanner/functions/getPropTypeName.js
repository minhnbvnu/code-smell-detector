function getPropTypeName(validate) {

  const types = {
    array: [],
    string: '',
    number: 0,
    bool: true,
    func: () => {},
    object: {},
    element: (<SimpleElement />),
    oneOf: "____"
  }

  for (let typeName in types) {
    const errors = validate({"name": types[typeName]}, "name");

    if ( !errors ) {
      return {
        "name": typeName,
        "values": typeName=='element'? undefined:types[typeName]
      };
    }

    switch(true) {
      case /one of/.test(errors):
        let oneOfArray = /expected one of (\[.*\])/.exec(errors);

        if (oneOfArray && oneOfArray[1]) {
          return {
            name: 'oneOf',
            options: JSON.parse(oneOfArray[1]) || []
          };
        }
        break;
    }
  }

  return {
    "name": 'unknown',
    "values": undefined
  }
}