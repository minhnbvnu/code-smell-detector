function loadChapters() {
  xhr('/chapters/list.json', function (err, resp, body) {
    if (err) return console.log(err)
    
    var template = $("#tmpl-chapter-list").html()
    $("#chapter-list").html(Mustache.render(template, JSON.parse(body)))
  })
}