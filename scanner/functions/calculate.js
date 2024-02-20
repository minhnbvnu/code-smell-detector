function calculate(condition, context){
    assert.ok(condition, 'Condition is missing.');
    assert.ok(condition.logic, 'Condition is in unexpected form. Need to have logic field.');
    assert.ok(condition.values, 'Condition is in unexpected form. Need to have values field.');
    assert.ok(context, 'context is missing.')
    switch(condition.logic){
        case 'and':
            return _.all(condition.values, function(onecond){
                return calculate(onecond, context);
            });
        case 'not':
            return !calculate(condition.values, context);
        default://normal
            return !!context[condition.values];
    }
}