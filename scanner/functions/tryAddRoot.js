function tryAddRoot(path, fileId) {
                const file = state.program.getSourceFile(path);
                if (!state.program.getFileIncludeReasons().get(file.path).some((r) => r.kind === 0 /* RootFile */))
                    return;
                if (!root.length)
                    return root.push(fileId);
                const last2 = root[root.length - 1];
                const isLastStartEnd = isArray(last2);
                if (isLastStartEnd && last2[1] === fileId - 1)
                    return last2[1] = fileId;
                if (isLastStartEnd || root.length === 1 || last2 !== fileId - 1)
                    return root.push(fileId);
                const lastButOne = root[root.length - 2];
                if (!isNumber(lastButOne) || lastButOne !== last2 - 1)
                    return root.push(fileId);
                root[root.length - 2] = [lastButOne, fileId];
                return root.length = root.length - 1;
            }