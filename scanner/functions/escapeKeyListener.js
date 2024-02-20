function escapeKeyListener() {
  document.body.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.querySelector(".fbc-wrapper")) {
      closeIframe();
    }
  });
}