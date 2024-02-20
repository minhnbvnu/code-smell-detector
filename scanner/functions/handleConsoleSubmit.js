function handleConsoleSubmit(e, command, frameID) {
  // Prevent page from refreshing.
  e.preventDefault();

  return new Promise((resolve) => {
    // Get input command.
    const cmd = command.value;

    // Setup GET request.
    const urlPath = "";
    const params = {
      __debugger__: "yes",
      cmd: cmd,
      frm: frameID,
      s: SECRET,
    };
    const paramString = Object.keys(params)
      .map((key) => {
        return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("");

    fetch(urlPath + "?" + paramString)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = data;
        resolve(tmp);

        // Handle expandable span for long list outputs.
        // Example to test: list(range(13))
        let wrapperAdded = false;
        const wrapperSpan = document.createElement("span");
        const expansionButton = createExpansionButtonForConsole();

        tmp.querySelectorAll("span.extended").forEach((spanToWrap) => {
          const parentDiv = spanToWrap.parentNode;
          if (!wrapperAdded) {
            parentDiv.insertBefore(wrapperSpan, spanToWrap);
            wrapperAdded = true;
          }
          parentDiv.removeChild(spanToWrap);
          wrapperSpan.append(spanToWrap);
          spanToWrap.hidden = true;

          expansionButton.addEventListener("click", (event) => {
            event.preventDefault();
            spanToWrap.hidden = !spanToWrap.hidden;
            expansionButton.classList.toggle("open");
            return false;
          });
        });

        // Add expansion button at end of wrapper.
        if (wrapperAdded) {
          wrapperSpan.append(expansionButton);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return false;
  });
}