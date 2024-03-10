function splitJoins(statement, cb) {
                var main = statement, join, i, cond, column, sel;

                // No need to split since there is no join.
                if(statement.fromClause.length === 1) {
                    return main;
                }

                // Can't deal with joins between more than two tables.
                if(statement.fromClause.length > 2) {
                    throw new this.SyntaxError("Line: " + statement.line + ": Statement must have no more than two tables in the from clause");
                }

                // Initialize the main statement.
                main = {
                    type: 'select',
                    line: statement.line,
                    columns: [],
                    selected: [], // These are the columns to be picked up at the end
                    extras: [], // Used only during selection discared laer.
                    whereCriteria: []
                };

                if(statement.extras) {
                    // These are extra columns included the columns array - contain UDF args not already
                    // listed in the columns clause
                    main.udfExtras = statement.extras;
                }

                // Initialize the joiner
                join = {
                    type: 'select',
                    line: statement.line,
                    columns: [],
                    extras: [], // used only during selection
                    whereCriteria: []
                };

                main.fromClause = [statement.fromClause[0]];
                join.fromClause = [statement.fromClause[1]];

                //  Split relevant columns into main and joiner
                for(i = 0; i < statement.columns.length; i++) {
                    column = statement.columns[i];
                    if(column.operator === 'udf') {
                        // Nothing to do
                    }
                    else if(column.name.indexOf(main.fromClause[0].alias + '.') === 0) {
                        // Keep it in main
                        if(indexOf(main.columns, column.name) < 0) {
                            main.columns.push(column);
                            sel = {from: 'main'};
                            if(column.alias) {
                                sel.name = column.alias;
                            }
                            else {
                                sel.index = main.columns.length - 1;
                            }
                            if(column.for) sel.for = column.for;
                            main.selected.push(sel);
                        }
                    }
                    else {
                        // Keep it in join
                        if(indexOf(join.columns, column.name) < 0) {
                            join.columns.push(column);
                            sel = {from: 'joiner'};
                            if(column.alias) {
                                sel.name = column.alias;
                            }
                            else {
                                sel.index = join.columns.length - 1;
                            }
                            if(column.for) sel.for = column.for;
                            main.selected.push(sel);
                        }
                    }
                }

                // We need a where clause for the join
                if(!statement.whereCriteria) {
                    throw new this.SyntaxError("Line " + statement.line + ": Missing join condition in statement ");
                }

                if(statement.whereCriteria) {
                    for(i = 0; i < statement.whereCriteria.length; i++) {
                        cond = statement.whereCriteria[i];
                        if(cond.operator === 'udf') {
                            main.whereCriteria.push(cond);
                        }
                        else if(cond.rhs.type && cond.rhs.type === 'alias') {
                            // This is the join condition
                            var index = cond.rhs.value.indexOf(main.fromClause[0].alias + '.');
                            if(index === 0) {
                                // Include only once
                                if(indexOf(main.columns, cond.rhs.value) < 0) {
                                    var index = cond.rhs.value.indexOf(main.fromClause[0].alias + '.');
                                    main.columns.push({
                                        name: cond.rhs.value,
                                        type: 'column'
                                    })
                                    if(statement.usingColumnAliases) {
                                        main.columns[main.columns.length - 1].alias = cond.rhs.alias ||
                                            cond.rhs.value.substr(index + main.fromClause[0].alias.length + 1);
                                    }
                                    main.extras.push(main.columns.length -1);
                                }
                                if(indexOf(join.columns, cond.lhs.name) < 0) {
                                    var index = cond.rhs.value.indexOf(join.fromClause[0].alias + '.');
                                    join.columns.push({
                                        name: cond.lhs.name,
                                        type: 'column'
                                    });
                                    if(statement.usingColumnAliases) {
                                        join.columns[join.columns.length - 1].alias = cond.lhs.alias ||
                                            cond.lhs.name.substr(index + join.fromClause[0].alias.length + 1)
                                    }
                                    join.extras.push(join.columns.length - 1);
                                }
                            }
                            else {
                                // Include only once
                                if(indexOf(join.columns, cond.rhs.value) < 0) {
                                    var index = cond.rhs.value.indexOf(join.fromClause[0].alias + '.');
                                    join.columns.push({
                                        name: cond.rhs.value,
                                        type: 'column'
                                    })
                                    if(statement.usingColumnAliases) {
                                        join.columns[join.columns.length - 1].alias = cond.rhs.alias ||
                                            cond.rhs.value.substr(index + join.fromClause[0].alias.length + 1)
                                    }
                                    join.extras.push(join.columns.length - 1);
                                }
                                if(indexOf(main.columns, cond.lhs.name) < 0) {
                                    var index = cond.lhs.name.indexOf(main.fromClause[0].alias + '.');
                                    main.columns.push({
                                        name: cond.lhs.name,
                                        type: 'column'
                                    });
                                    if(statement.usingColumnAliases) {
                                        main.columns[main.columns.length - 1].alias = cond.lhs.alias ||
                                            cond.lhs.name.substr(index + main.fromClause[0].alias.length + 1)
                                    }

                                    main.extras.push(main.columns.length -1);
                                }
                            }
                            join.whereCriteria.push(cond);
                        }
                        else {
                            if(cond.lhs.name.indexOf(main.fromClause[0].alias + '.') === 0) {
                                main.whereCriteria.push(cond);
                            }
                            else if(cond.lhs.name.indexOf(join.fromClause[0].alias + '.') === 0) {
                                join.whereCriteria.push(cond);
                            }
                        }
                    }
                }

                if(join.whereCriteria && join.whereCriteria.length > 0) {
                    for(var i in join.whereCriteria){
                        if(indexOf(main.columns, join.whereCriteria[i].rhs.value) >= 0) {
                            join.whereCriteria[i].rhs.joiningColumn = indexOf(main.columns, join.whereCriteria[i].rhs.value);
                        }
                        else if (indexOf(main.columns, join.whereCriteria[i].lhs.name) >= 0){
                            // Flip the condition
                            var temp = join.whereCriteria[i].rhs.value;
                            join.whereCriteria[i].rhs.value = join.whereCriteria[i].lhs.name;
                            join.whereCriteria[i].lhs = {
                                name: temp
                            }
                            temp = join.whereCriteria[i].rhs.value;
                            join.whereCriteria[i].rhs.joiningColumn = indexOf(main.columns, temp);
                        }
                    }
                }
                main.joiner = join;

                // Reset the joiningColumn to the alias where columns are aliased
                // The joining column is an index by default.
                for (var j in join.whereCriteria){
                    var joiningColumn;
                    if(main.columns[join.whereCriteria[j].rhs.joiningColumn] && main.columns[join.whereCriteria[j].rhs.joiningColumn].alias) {
                        for(var i = 0; i < main.columns.length; i++) {
                            if(main.columns[i].name === main.joiner.whereCriteria[j].rhs.value) {
                                joiningColumn = main.columns[i].alias;
                                break;
                            }
                        }
                        if(joiningColumn) {
                            main.joiner.whereCriteria[j].rhs.joiningColumn = joiningColumn;
                        }
                        else {
                            throw new this.SyntaxError("Line " + main.line + ": Joining column " + joiningColumn + " could not resolved. File a bug.");
                        }
                    }
                }

                // Verify that all columns have prefixes
                for(var i = 0; i < main.columns.length; i++) {
                    if(!main.columns[i].operator) {
                        var prefixed = false;
                        for(var j = 0; j < main.fromClause.length; j++) {
                            if(main.columns[i].name.indexOf(main.fromClause[j].alias + '.') === 0) {
                                prefixed = true;
                                break;
                            }
                        }
                        if(!prefixed) {
                            throw new this.SyntaxError("Line " + main.line + ": Column " + main.columns[i].name + " not prefixed or prefix not found");
                        }
                    }
                }
                for(var i = 0; i < join.columns.length; i++) {
                    if(!join.columns[i].operator) {
                        var prefixed = false;
                        for(var j = 0; j < join.fromClause.length; j++) {
                            if(join.columns[i].name.indexOf(join.fromClause[j].alias + '.') === 0) {
                                prefixed = true;
                                break;
                            }
                        }
                        if(!prefixed) {
                            throw new this.SyntaxError("Line " + main.line + ": Column " + join.columns[i].name + " not prefixed or prefix not found");
                        }
                    }
                }

                // Redo the UDF args since the indexes of column type args would be different now
                // The index for each column arg should map to the 'selected' array so that we can pick up
                // values of args from the 'selected' array.
                for(var i = 0; i < main.whereCriteria.length; i++) {
                    var where = main.whereCriteria[i];
                    if(where.operator === 'udf') {
                        for(var j = 0; j < where.args.length; j++) {
                            if(where.args[j].type === 'column') {
                                // What is the prefix?
                                var index = where.args[j].name.indexOf('.');
                                if(index < 0) {
                                    throw new this.SyntaxError("Line " + main.line + ": Arg " + where.args[j].name + " not prefixed");
                                }
                                var prefix = where.args[j].name.substr(0, index);
                                var name = where.args[j].name.substr(index + 1);
                                if(main.fromClause[0].alias === prefix) {
                                    // From main - find matching selected[] element where from = main and name = arg.name.
                                    for(var selected = 0; selected < main.selected.length; selected++) {
                                        if(main.selected[selected].from === 'main') {
                                            if(main.selected[selected].name && main.selected[selected].name === name) {
                                                where.args[j].index = selected;
                                            }
                                            else if(main.selected[selected].hasOwnProperty('index') &&
                                                main.columns[main.selected[selected].index].name === where.args[j].name) {
                                                where.args[j].index = selected;
                                            }
                                        }
                                    }
                                }
                                else if(main.joiner.fromClause[0].alias === prefix) {
                                    // From joiner - find matching selected[] element where from = joiner and name = arg.name.
                                    for(var selected = 0; selected < main.selected.length; selected++) {
                                        if(main.selected[selected].from === 'joiner') {
                                            if(main.selected[selected].name && main.selected[selected].name === name) {
                                                where.args[j].index = selected;
                                            }
                                            else if(main.selected[selected].hasOwnProperty('index') &&
                                                join.columns[main.selected[selected].index].name === where.args[j].name) {
                                                where.args[j].index = selected;
                                            }
                                        }
                                    }
                                }
                                else {
                                    throw new this.SyntaxError("Line " + main.line + ": Alias of arg " + where.args[j].name + " not found");
                                }
                            }
                        }
                    }
                }

                return main;
            }