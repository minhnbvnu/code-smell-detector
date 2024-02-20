function changeAll(check) {
  let inputs = document.querySelectorAll('input[type="checkbox"]');
  for (let input of inputs) {
    input.checked = check;
  }
}