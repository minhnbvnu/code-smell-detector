function _instanciateQueue() {
    return {
        queue(command) {
            const layer = command.layer;
            let st = this.storages.get(layer.id);
            if (!st) {
                st = {
                    q: new PriorityQueue({ comparator: queueOrdering }),
                    priority: 1,
                    accumulator: 0,
                };
                this.storages.set(layer.id, st);
            }
            // update priority (layer.priority may have changed)
            st.priority = layer.priority || 1;
            st.q.queue(command);
            this.counters.pending++;
        },
        storages: new Map(),
        counters: {
            // commands in progress
            executing: 0,
            // commands successfully executed
            executed: 0,
            // commands failed
            failed: 0,
            // commands cancelled
            cancelled: 0,
            // commands pending
            pending: 0,
        },
        execute(cmd, provider) {
            this.counters.pending--;
            this.counters.executing++;
            return provider.executeCommand(cmd).then((result) => {
                this.counters.executing--;
                cmd.resolve(result);
                // only count successul commands
                this.counters.executed++;
            }, (err) => {
                this.counters.executing--;
                cmd.reject(err);
                this.counters.failed++;
                if (__DEBUG__ && this.counters.failed < 3) {
                    console.error(err);
                }
            });
        },
    };
}