function insertNewQrDiv() {
  const newDiv = document.createElement("div");

  newDiv.style.display = 'none';
  newDiv.id = qrId;

  const parentEl = checkboxlandEl.parentNode;

  // Insert the new element into before sp2
  parentEl.insertBefore(newDiv, checkboxlandEl);
}