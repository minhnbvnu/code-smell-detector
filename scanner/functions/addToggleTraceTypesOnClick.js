function addToggleTraceTypesOnClick(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", () => {
      document.querySelector("div.traceback").classList.toggle("hidden");
      document.querySelector("div.plain").classList.toggle("hidden");
    });
    elements[i].style.cursor = "pointer";
    document.querySelector("div.plain").classList.toggle("hidden");
  }
}