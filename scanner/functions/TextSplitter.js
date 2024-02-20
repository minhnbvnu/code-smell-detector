function TextSplitter(e) {
  this.e = e;
  this.br = 0;
  this.line = [];
  this.text = [];
  this.original = e.innerText || e.textContent;
}