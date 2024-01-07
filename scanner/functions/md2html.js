function md2html( file ){
  file = file.substr( file.length - 3 ) === '.md' ? file : file + '.md'; // add extension if need be

  let md;
  try{
    md = fs.readFileSync( path.join(__dirname, './md', file) , 'utf8');
  } catch(e){
    throw 'A markdown file named `' + file + '` was referenced but could not be read';
  }

  // let html = converter.makeHtml( md );
  //let html = mdConvertor( md );
  marked.setOptions({
    highlight: function(code, lang){
      let ret;

      if( lang ){
        ret = hljs.highlight(lang, code).value;
      } else {
        ret = hljs.highlightAuto(code).value;
      }

      return ret;

    },

    smartypants: true,

    renderer: mdRend,

    gfm: true
  } );

  let html = marked.parse( md );

  return html;
}