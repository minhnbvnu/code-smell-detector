function logRow(message, className, handler)
    {
        if (consoleBody)
            writeMessage(message, className, handler);
        else
        {
            messageQueue.push([message, className, handler]);
            waitForBody();
        }
    }