function iframe() {
  const ifr = document.createElement('iframe');

  ifr.setAttribute('id', `ifr${i++}`);

  // append it to dom so we can get the document
  document.body.appendChild(ifr);

  return ifr.contentWindow;
}