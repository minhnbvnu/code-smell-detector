function pushGroup(message, className)
    {
        logFormatted(message, className);

        var groupRow = consoleBody.ownerDocument.createElement("div");
        groupRow.className = "logGroup";
        var groupRowBox = consoleBody.ownerDocument.createElement("div");
        groupRowBox.className = "logGroupBox";
        groupRow.appendChild(groupRowBox);
        appendRow(groupRowBox);
        groupStack.push(groupRowBox);
    }