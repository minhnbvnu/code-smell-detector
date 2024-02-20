function handleAuth0Provider(element, options, challenge, load) {
  element.innerHTML = options.templates[challenge.provider](challenge);
  element
    .querySelector('.captcha-reload')
    .addEventListener('click', function (e) {
      e.preventDefault();
      load();
    });
}