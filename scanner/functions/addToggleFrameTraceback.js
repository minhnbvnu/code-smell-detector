function addToggleFrameTraceback(frames) {
  frames.forEach((frame) => {
    frame.addEventListener("click", () => {
      frame.getElementsByTagName("pre")[0].parentElement.classList.toggle("expanded");
    });
  })
}