function collapseGroup(varArgs) {
            var args = Array.prototype.slice.call(arguments);
            var arg0 = args[0];
            var groupingKey;
            var level;
            if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
                groupingKey = arg0;
                level = arg0.split(groupingDelimiter).length - 1;
            }
            else {
                groupingKey = args.join(groupingDelimiter);
                level = args.length - 1;
            }
            expandCollapseGroup(level, groupingKey, true);
            onGroupCollapsed.notify({ level: level, groupingKey: groupingKey });
        }