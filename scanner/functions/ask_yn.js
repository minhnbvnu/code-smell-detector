async function ask_yn(question) {
                const ret = await ask(`${question} [y/n]`, "y");
                switch (ret) {
                    case "y":
                        return true;
                    case "n":
                        return false;
                    default: {
                        print(`${red("Invalid input")}. Assuming no.`);
                        return false;
                    }
                }
            }