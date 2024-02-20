function resetDom() {

    document.getElementById("breakout-score")?.remove();
    document.querySelectorAll("h1").forEach((h1) => {
      // set back to the original text
      h1.innerText = h1.getAttribute("data-original-text");
      // remove the h2
      h1.parentNode.removeChild(h1.nextSibling);
    });
    // stop animating title
    clearInterval(titleInterval);
    // set back to the original title
    document.title = document.ogTitle;
  }