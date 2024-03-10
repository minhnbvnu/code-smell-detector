    window.clearAndTypeInput = async function (text, keystrokeDelay = 30) {
        text = text.trim();
        const commands = [];
        commands.push(commandIDs.CommandCENTR);
        let numberIsNegative = text[0] === "-" || text[0] === "−";
        let gotExponent = false;
        let gotDigitAfterExponent = false;
        let gotDecimalPoint = false; // . (TODO: handle comma? can be ambiguous.)
        let gotExponentSign = false; // - or + (optional)
        for (let i = numberIsNegative ? 1 : 0; i < text.length; i++) {
            const char = text[i];
            if (char === "." && !gotExponent && !gotDecimalPoint) {
                commands.push(commandIDs.CommandPNT);
                gotDecimalPoint = true;
            } else if (char.match(/\d/)) {
                commands.push(commandIDs[`Command${char}`]);
                if (gotExponent) {
                    gotDigitAfterExponent = true;
                }
            } else if ((char === "e" || char === "E" || char === "x" || char === "X") && !gotExponent) {
                commands.push(commandIDs.CommandEXP);
                gotExponent = true;
            } else if ((char === "-" || char === "+") && gotExponent && !gotExponentSign && !gotDigitAfterExponent) {
                // Note: negative sign for the whole number is already handled above, and the char skipped over.
                // This is just for the sign of the exponent. Plus sign is optional and doesn't change the meaning.
                if (char === "-") {
                    commands.push(commandIDs.CommandSIGN);
                }
                gotExponentSign = true;
            } else if (char.match(/[*/+\-()%|&]/)) {
                if (standardKeyboardMap[char]) {
                    commands.push(commandIDs[standardKeyboardMap[char]]);
                }
            } else if (char === ":") {
                // :c	Clears memory.
                // :e	Enables you to enter scientific notation numbers in decimal form. Also specifies the number E in hexadecimal.
                // :m	Stores the displayed number in memory.
                // :p	Adds the displayed number to the number in memory.
                // :q	Clears the current calculation.
                // :r	Displays the number stored in memory.

                i += 1;
                const char = text[i];
                if (char === "c") {
                    commands.push(commandIDs.CommandMCLEAR);
                } else if (char === "e") {
                    commands.push(commandIDs.CommandEXP);
                } else if (char === "m") {
                    commands.push(commandIDs.CommandSTORE);
                } else if (char === "p") {
                    commands.push(commandIDs.CommandMPLUS);
                } else if (char === "q") {
                    commands.push(commandIDs.CommandCLEAR);
                } else if (char === "r") {
                    commands.push(commandIDs.CommandRECALL);
                }
            } else if (char === "\\") {
                // \	Functions the same as Dat. Click Sta before using this key.
                // TODO: statistics functionality
            } else if (char !== " ") {
                alert(`Invalid input. Unexpected '${char}'`);
                return;
            }
        }
        if (gotExponent && !gotDigitAfterExponent) {
            alert("Invalid input. Expected digits after exponent indicator.");
            return;
        }
        if (numberIsNegative) {
            commands.push(commandIDs.CommandSIGN);
        }
        if (keystrokeDelay) {
            const iid = setInterval(() => {
                const command = commands.shift();
                if (!command) {
                    clearInterval(iid);
                    return;
                }
                sendCommand(command, true);
            }, keystrokeDelay);
        } else {
            commands.map((command) => sendCommand(command, false));
        }
    }