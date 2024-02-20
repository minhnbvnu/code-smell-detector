function render_page() {
  var html = render("layout", {
    title: "Links",
    contents: render("links", {
      partial: render,
      links: require('./data')
    })
  });
  console.log(html);
}