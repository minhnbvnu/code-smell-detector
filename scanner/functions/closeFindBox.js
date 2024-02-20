function closeFindBox() {
  var findBox = document.querySelector('#find-box');
  findBox.style.display = 'none';
  findBox.style.left = "";
  findBox.style.opacity = "";
  document.querySelector('#find-results').innerText= "";
}