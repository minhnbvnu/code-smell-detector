function processWithHeader(test) {
    // Cannot create a function because that would break the
    // coroutines used for preemptive multitasking.
    //
    // Syntax: with var0[, var1[, ...]] ∊ expr
    //
    //
    // Maps to ($_ variables are gensyms):
    //
    //
    // { let $_obj = (expr),
    //       var0 = $_obj.var0, ..., varn = $_obj.varn,
    //       $_var0Descriptor = Object.getOwnPropertyDescriptor($_obj, 'var0'), ...;
    //   Object.defineProperties($_obj, {var0: {configurable:true, get() { return var0; }, set($_v) { var0 = $_v; }}, ...});
    //   try {
    //
    //      ...
    //
    //   } finally {
    //       if ($_var0Descriptor.get) Object.defineProperty($_obj, 'var0', $_var0Descriptor); else delete $_obj.var0; $_obj.var0 = var0;
    //       ...
    //  }}

    const match = test.match(withIdentifierListRegex);
    // match[0] = whole match
    // match[1] = variables
    // match[2] = object expression

    if (! match) {
        throw 'Incorrect WITH statement syntax';        
    }
    
    const expr = match[2].trim();
    const varArray = match[1].split(',').map(function (s) { return s.trim(); });

    const obj = gensym('obj'), v = gensym('v');
    const varDescriptorArray = varArray.map(function (vari) { return gensym(vari + 'Descriptor'); });

    const result = [];
    
    const index = gensym('index');
    result[0] = `{ let ${obj} = (${expr})`;
    for (let i = 0; i < varArray.length; ++i) {
        result[0] += `, ${varArray[i]} = ${obj}.${varArray[i]}`;
    }
    
    for (let i = 0; i < varArray.length; ++i) {
        result[0] += `, ${varDescriptorArray[i]} = $Object.getOwnPropertyDescriptor(${obj}, '${varArray[i]}')`;
    }

    result[0] += ';';

    for (let i = 0; i < varArray.length; ++i) {
        result[0] += ` if (! ${varDescriptorArray[i]}) { $error("No '${varArray[i]}' property on object in this with statement")};`;
    }
    
    result[0] += `$Object.defineProperties(${obj}, {` +
        varArray.reduce(function(prev, vari) { return prev + `${vari}: {configurable: true, get() { return ${vari}; }, set(${v}) { ${vari} = ${v}; }}, `; }, '') +
        '}); try {';
    

    result[1] = '} finally { ';

    for (let i = 0; i < varArray.length; ++i) {
        result[1] += `if (${varDescriptorArray[i]}.get) { $Object.defineProperty(${obj}, '${varArray[i]}', ${varDescriptorArray[i]}); } else { delete ${obj}.${varArray[i]}; } ${obj}.${varArray[i]} = ${varArray[i]}; `;
    }
    result[1] += '}}';
    
    return result;
}