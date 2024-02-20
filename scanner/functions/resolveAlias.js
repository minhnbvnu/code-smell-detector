function resolveAlias(aliasStr) {
                var aliasDefinition = opts.aliases[aliasStr];
                if (aliasDefinition) {
                    if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias); //alias is another alias
                    $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
                    $.extend(true, opts, options);  //reapply extra given options
                    return true;
                }
                return false;
            }