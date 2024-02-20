function addConsoleIconToFrames(frames) {
  for (let i = 0; i < frames.length; i++) {
    let consoleNode = null;
    const target = frames[i];
    const frameID = frames[i].id.substring(6);

    for (let j = 0; j < target.getElementsByTagName("pre").length; j++) {
      const img = createIconForConsole();
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        consoleNode = openShell(consoleNode, target, frameID);
        return false;
      });
      target.getElementsByTagName("pre")[j].append(img);
    }
  }
}