function countPathComponents(path) {
            let count = 0;
            for (let i = startsWith(path, "./") ? 2 : 0; i < path.length; i++) {
                if (path.charCodeAt(i) === 47 /* slash */)
                    count++;
            }
            return count;
        }