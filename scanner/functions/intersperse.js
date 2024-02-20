function intersperse(input, element) {
            if (input.length <= 1) {
                return input;
            }
            const result = [];
            for (let i = 0, n = input.length; i < n; i++) {
                if (i)
                    result.push(element);
                result.push(input[i]);
            }
            return result;
        }