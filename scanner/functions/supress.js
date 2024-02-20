function supress(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "link";
  e.dataTransfer.effectAllowed = "link";
}