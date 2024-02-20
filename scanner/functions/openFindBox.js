function openFindBox() {
  document.querySelector('#find-box').style.display = 'block';
  document.forms['find-form']['find-text'].select();
}