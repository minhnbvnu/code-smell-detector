function addCss(css) {
    const style = document.createElement('style');
    style.innerText = css;
    document.documentElement.appendChild(style)
}