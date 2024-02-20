function failureStringStart(otherLine) {
                // For only 2 overloads we don't need to specify which is the other one.
                const overloads = otherLine === undefined
                    ? 'These overloads'
                    : `This overload and the one on line ${otherLine}`;
                return `${overloads} can be combined into one signature`;
            }