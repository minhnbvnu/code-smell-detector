function writeRow(message, className)
    {
        var row = consoleBody.ownerDocument.createElement("div");
        row.className = "logRow" + (className ? " logRow-"+className : "");
        row.innerHTML = message.join("");
        appendRow(row);
    }