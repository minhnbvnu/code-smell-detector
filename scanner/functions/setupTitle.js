function setupTitle () {
  titleEl = document.createElement('div');
  titleEl.className = LOADER_TITLE_CLASS;
  titleEl.innerHTML = document.title;
  titleEl.style.display = 'none';
  sceneEl.appendChild(titleEl);
}