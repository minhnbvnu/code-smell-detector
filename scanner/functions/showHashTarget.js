function showHashTarget(targetId) {
  if (targetId) {
    var hashTarget = document.getElementById(targetId);
    // new target is hidden
    if (
      hashTarget &&
      hashTarget.offsetHeight === 0 &&
      hashTarget.parentNode.parentNode.classList.contains('display-none')
    ) {
      hashTarget.parentNode.parentNode.classList.remove('display-none');
    }
  }
}