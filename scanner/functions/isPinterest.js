function isPinterest(target) {
  const { parentElement } = target;
  if (parentElement) {
    const { previousElementSibling } = parentElement;
    if (previousElementSibling) {
      return previousElementSibling.classList.contains("fbc-has-badge");
    }
  }
  return false;
}