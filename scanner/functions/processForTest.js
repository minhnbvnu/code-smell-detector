function processForTest(test) {
    let before = '', after = '}';

    if ((test[0] === '(') && (test[test.length - 1] === ')') && (nextInstance(test, ')', 1) === test.length - 1)) {
        // There are extra parens surrounding the entire test
        test = test.substring(1, test.length - 1);
    }

    // Named index/key
    let key = gensym('key');
    test = test.replace(RegExp('\\s+at\\s+(' + identifierPattern + ')\\s*∊'), function (match, keyName) {
        key = keyName;
        return ' ∊';
    });

    // The case of a FOR-WITH loop of the form 'for x,y,... ∊ a ∊ array ...'
    let match = test.match(RegExp('^\\s*(\\S.*)∊\\s*(' + identifierPattern + ')\\s*∊(.*)$'));
    if (match) {
        // match[1] = member variables
        // match[2] = with container expr/for variable
        // match[3] = for container expr

        // Rewrite the tested expr
        const withPart = processWithHeader(match[1] + '∊' + match[2]);
        before = withPart[0];
        after = withPart[1] + '}';
        test = match[2] + '∊' + match[3]
    }
        
    match = test.match(RegExp('^\\s*(' + identifierPattern + ')\\s*∊(.*)$'));
    
    if (match) {
        // Generate variables
        const value = match[1],
              container = gensym('container'),
              is_obj = gensym('is_obj'),
              index = gensym('index'),
              key_array = gensym('key_array'),
              is_mutable = gensym('is_mutable'),
              containerExpr = match[2].trim();

        // The '==' on the next line is converted to a === by the remaining compiler pass
        return [`{const ${container} = ${containerExpr}; ` +
                `const ${is_obj} = is_object(${container}); ` +
                `$checkContainer(${container}); ` +
                `const ${is_mutable} = ! $Object.isFrozen(${container}) && ! $Object.isSealed(${container}); ` +
                `try { ` +
                `  let ${key_array} = ${is_obj} ? keys(${container}) : ${container}; ` +
                `  if (${is_mutable}) { $iteratorCount.set(${container}, ($iteratorCount.get(${container}) || 0) + 1); } ` +
                `  for (let ${index} = 0; ${index} < ${key_array}.length; ++${index}) { ` +
                `    let ${key} = ${is_obj} ? ${key_array}[${index}] : ${index}; ` +
                `    if (${is_obj} && (${key}[0] == '_')) { continue; }; ` +
                `    let ${value} = ${container}[${key}]; ${before} `,
                after +
                `} finally { if (${is_mutable}) { $iteratorCount.set(${container}, $iteratorCount.get(${container}) - 1); }}}`];
    } else {
        before = '{';
    }

    // Range FOR loop
    
    // Look for ≤ or < expressions, but skip over pairs of parens
    const j = nextInstance(test, '<', 0, '≤');
    if (j === -1) { throw 'No < or ≤ found in FOR loop declaration'; }
    var op = (test[j] === '≤') ? '<=' : '<';
    
    const k = nextInstance(test, '<', j + 1, '≤');
    let identifier, initExpr, endExpr;

    if (k === -1) {
        // has the form "variable < expr"
        identifier = test.substring(0, j).trim();
        endExpr = test.substring(j + 1).trim();
        initExpr = '0';
    } else {
        // has the form "expr < variable < expr"
        // j is the location of the first operator
        // k is the location of the second operator
        
        initExpr = test.substring(0, j).trim();
        if (op === '<') {
            initExpr = '$Math.floor(' + initExpr + ') + 1';
        }

        op = (test[k] === '≤') ? '<=' : '<';
        identifier = test.substring(j + 1, k).trim();
        endExpr = test.substring(k + 1).trim();
    }

    if (! legalIdentifier(identifier)) { throw 'Illegal FOR-loop variable syntax'; }
    const iterator = gensym(identifier);
    const endVar = gensym('end');
    return [`for (let ${iterator} = ${initExpr}, ${endVar} = ${endExpr}; ${iterator} ${op} ${endVar}; ++${iterator}) ${before} let ${identifier} = ${iterator};`, after];
}