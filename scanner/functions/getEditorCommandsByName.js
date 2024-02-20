function getEditorCommandsByName(excludeCommands) {
        var commandsByName = [];
        var commandMap = {};
        editor.keyBinding.$handlers.forEach(function(handler) {
            var platform = handler.platform;
            var cbn = handler.byName;
            for (var i in cbn) {
                var key;
                if (cbn[i].bindKey && cbn[i].bindKey[platform] !== null) {
                    key = cbn[i].bindKey["win"];
                } else {
                    key = "";
                }

                var commands = cbn[i];
                var description = commands.description || normalizeName(commands.name);
                if (!Array.isArray(commands))
                    commands = [commands];
                commands.forEach(function(command) {
                    if (typeof command != "string")
                        command = command.name;
                    var needle = excludeCommands.find(function(el) {
                        return el === command;
                    });
                    if (!needle) {
                        if (commandMap[command]) {
                            commandMap[command].key += "|" + key;
                        } else {
                            commandMap[command] = {key: key, command: command, description: description};
                            commandsByName.push(commandMap[command]);
                        }
                    }
                });
            }
        });
        return commandsByName;
    }