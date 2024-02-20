function fetchGitUserInfo(username, requestFromBGSync) {
    var name = username || 'gokulkrishh';
    var url = 'https://api.github.com/users/' + name;

    spinnerElement.classList.add('show'); //show spinner

    fetch(url, { method: 'GET' })
    .then(function(fetchResponse){ return fetchResponse.json() })
      .then(function(response) {
        if (!requestFromBGSync) {
          localStorage.removeItem('request'); //Once API is success, remove request data from localStorage
        }
        cardElement.querySelector('.card__title').textContent = response.name;
        cardElement.querySelector('.card__desc').textContent = response.bio;
        cardElement.querySelector('.card__img').setAttribute('src', response.avatar_url);
        cardElement.querySelector('.card__following span').textContent = response.following;
        cardElement.querySelector('.card__followers span').textContent = response.followers;
        cardElement.querySelector('.card__temp span').textContent = response.company;
        spinnerElement.classList.remove('show'); //hide spinner
      })
      .catch(function (error) {
        //If user is offline and sent a request, store it in localStorage
        //Once user comes online, trigger bg sync fetch from application tab to make the failed request
        localStorage.setItem('request', name);
        spinnerElement.classList.remove('show'); //hide spinner
        console.error(error);
      });
  }