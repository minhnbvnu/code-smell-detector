function getQueue() {
            var current = queueHead;
            var tasks = [];
            while (current) {
                tasks.push(current.value);
                current = current.next;
            }
            return tasks;
        }