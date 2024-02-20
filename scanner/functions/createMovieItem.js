function createMovieItem(movieData) {
  const template = `<div class="item">
    <a href="${'https://www.imdb.com/title/' + movieData.imdbID}" class="item__link" target="_blank">
      <div class="item__img"><img class="item__img__img" src="${movieData.Poster}" onerror="this.src='https://placehold.co/185x278'" width="185" height="278"/></div>
      <h1 class="item__title">${movieData.Title}</h1>
      <div class="item__year">${movieData.Year}</div>
      <div class="item__rating" title="IMDB Rating">${movieData.imdbRating}</div>
    </a>
  </div>
  `;

  let item = document.createElement('div');
  item.innerHTML = template.trim();

  return item.firstChild;
}