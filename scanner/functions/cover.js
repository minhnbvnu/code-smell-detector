function cover() {
  const SL = ', 100%, 85%'
  const bgc =
    'linear-gradient(to left bottom, ' +
    `hsl(${Math.floor(Math.random() * 255) + SL}) 0%,` +
    `hsl(${Math.floor(Math.random() * 255) + SL}) 100%)`

  return (
    `<section class="cover show" style="background: ${bgc}">` +
    '<div class="cover-main"><!--cover--></div>' +
    '<div class="mask"></div>' +
    '</section>'
  )
}