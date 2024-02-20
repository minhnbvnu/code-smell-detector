function helperString(input, ...args) {
            return (uniqueName) => {
                let result = "";
                for (let i = 0; i < args.length; i++) {
                    result += input[i];
                    result += uniqueName(args[i]);
                }
                result += input[input.length - 1];
                return result;
            };
        }