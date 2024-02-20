function tpl(defaultValue = '') {
  const html =
    `<div class="input-wrap">
      <input type="search" value="${defaultValue}" />
      <div class="clear-button">
        <svg width="26" height="24">
          <circle cx="12" cy="12" r="11" fill="#ccc" />
          <path stroke="white" stroke-width="2" d="M8.25,8.25,15.75,15.75" />
          <path stroke="white" stroke-width="2"d="M8.25,15.75,15.75,8.25" />
        </svg>
      </div>
    </div>
    <div class="results-panel"></div>
    </div>`
  const el = Docsify.dom.create('div', html)
  const aside = Docsify.dom.find('aside')

  Docsify.dom.toggleClass(el, 'search')
  Docsify.dom.before(aside, el)
}