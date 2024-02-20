function expandGroup(varArgs) {
            var args = Array.prototype.slice.call(arguments);
            var arg0 = args[0];
            var groupingKey;
            var level;
            if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
                level = arg0.split(groupingDelimiter).length - 1;
                groupingKey = arg0;
            }
            else {
                level = args.length - 1;
                groupingKey = args.join(groupingDelimiter);
            }
            expandCollapseGroup(level, groupingKey, false);
            onGroupExpanded.notify({ level: level, groupingKey: groupingKey });
        }