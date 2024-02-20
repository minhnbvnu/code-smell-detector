function eql(expects, actuals) {
  if (expects.length !== actuals.length) {
    return false;
  }

  for (var i = 0; i < expects.length; i++) {
    const expect = expects[i];
    const actual = actuals[i];
    if (isSameType(expect, actual)) {
      continue;
    }

    if (isSameNumber(expect, actual)) {
      continue;
    }
    

    // actual is null
    if (actual.type === 'basic' && actual.name === 'null') {
      continue;
    }

    

    if(expect.type === 'model' && actual.type === 'model') {
      // $Model vs model
      if(expect.name === '$Model') {
        continue;
      }

      // $Error vs exception
      if(expect.name === '$Error' && actual.isException) {
        continue;
      }

      if (isExtendOn(expect, actual)) {
        continue;
      }
    }

    if (expect.type === 'map' && expect.keyType.name === 'string') {
      // expect: object
      // actual: model
      if (actual.type === 'model') {
        continue;
      }
    }

    if (expect.type === 'basic' && actual.type === 'basic') {
      if (expect.name === 'integer' && actual.name === 'number') {
        continue;
      }

      if (expect.name === 'long' && actual.name === 'number') {
        continue;
      }
    }

    if (expect.type === 'basic' && expect.name === 'any') {
      // expect: any
      continue;
    }

    // Model vs object
    if (expect.type === 'model' && actual.type === 'map') {
      continue;
    }

    // Model vs any
    if (expect.type === 'model' && actual.type === 'basic' && actual.name === 'any') {
      continue;
    }

    if (expect.type !== actual.type) {
      return false;
    }

    const type = expect.type;

    if (type === 'map') {
      if (expect.keyType.name === actual.keyType.name) {
        if (expect.valueType.name === 'any') {
          // map[string]any vs map[string]string
          continue;
        }
        if (isAssignable(expect.valueType, actual.valueType)) {
          continue;
        }
      }
    }

    if (type === 'entry') {
      if (expect.valueType.name === 'any') {
        // entry[any] vs entry[string]
        continue;
      }
      if (isAssignable(expect.valueType, actual.valueType)) {
        continue;
      }
    }
    
    if (type === 'array') {
      if (expect.itemType.name === 'any') {
        // [any] vs [string] 
        continue;
      }

      if (isAssignable(expect.itemType, actual.itemType)) {
        continue;
      }
    }

    return false;
  }

  return true;
}