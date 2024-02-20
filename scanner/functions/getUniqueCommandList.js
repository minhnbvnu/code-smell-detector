function getUniqueCommandList(commands, usedCommands) {
                if (!usedCommands || !usedCommands.length) {
                    return commands;
                }
                var excludeCommands = [];
                usedCommands.forEach(function(item) {
                    excludeCommands.push(item.command);
                });

                var resultCommands = [];

                commands.forEach(function(item) {
                    if (excludeCommands.indexOf(item.command) === -1) {
                        resultCommands.push(item);
                    }
                });

                return resultCommands;
            }