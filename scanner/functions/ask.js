async function ask(question, default_value) {
                return new Promise((resolve, _reject) => {
                    rl.question(`${question} `, (answer) => {
                        resolve(answer.length != 0 ? answer : default_value);
                    });
                });
            }