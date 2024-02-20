function groupEnd() {
            group.ended = new Date();
            opts.on.groupend(group);
        }