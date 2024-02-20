function openShell(consoleNode, target, frameID) {
  promptForPin();
  if (consoleNode) {
    slideToggle(consoleNode);
    return consoleNode;
  }
  let historyPos = 0;
  const history = [""];
  const consoleElement = createConsole();
  const output = createConsoleOutput();
  const form = createConsoleInputForm();
  const command = createConsoleInput();

  target.parentNode.appendChild(consoleElement);
  consoleElement.append(output);
  consoleElement.append(form);
  form.append(command);
  command.focus();
  slideToggle(consoleElement);

  form.addEventListener("submit", (e) => {
    handleConsoleSubmit(e, command, frameID).then((consoleOutput) => {
      output.append(consoleOutput);
      command.focus();
      consoleElement.scrollTo(0, consoleElement.scrollHeight);
      const old = history.pop();
      history.push(command.value);
      if (typeof old !== "undefined") {
        history.push(old);
      }
      historyPos = history.length - 1;
      command.value = "";
    });
  });

  command.addEventListener("keydown", (e) => {
    if (e.key === "l" && e.ctrlKey) {
      output.innerText = "--- screen cleared ---";
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      // Handle up arrow and down arrow.
      if (e.key === "ArrowUp" && historyPos > 0) {
        e.preventDefault();
        historyPos--;
      } else if (e.key === "ArrowDown" && historyPos < history.length - 1) {
        historyPos++;
      }
      command.value = history[historyPos];
    }
    return false;
  });

  return consoleElement;
}