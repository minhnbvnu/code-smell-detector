function getSketchDependencies(path){
  var indexFile = fs.readFileSync(path, "utf8");

  var reqSrcs = [];

  $ = cheerio.load(indexFile);

  // get the script tags
  $('script').each(function(i, elem) {
    var libsrc = $(elem)[0].attribs.src;

    if(libsrc !== undefined ){
      if(libsrc.split("/")[0] == ".."){
        libsrc = libsrc.split("/").slice(2).join("/");
        reqSrcs.push(libsrc);
      }
    }
    $(this).attr("src", libsrc);
    })

  // get the links
  $('link').each(function(i, elem) {
      var libhref = $(elem)[0].attribs.href;
      libhref = libhref.split("/").slice(2).join("/");
      reqSrcs.push(libhref);
      $(this).attr("href", libhref);
  })

  // console.log($.html())
  // console.log(reqSrcs)
  // write out the file
  fs.writeFileSync(path, $.html())

  return reqSrcs;

}