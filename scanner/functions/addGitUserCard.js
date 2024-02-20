function addGitUserCard() {
    var userInput = addCardInputElement.value;
    if (userInput === '') return;
    addCardInputElement.value = '';
    localStorage.setItem('request', userInput);
    fetchGitUserInfo(userInput);
  }