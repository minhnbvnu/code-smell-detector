function writeDocs(){
  
  let context = config;
    
  compileConfig( config );

  let htmlTemplate = fs.readFileSync( path.join(__dirname, './template.html'), encoding);
  let template = Handlebars.compile( htmlTemplate );
  let html = template( context );

  fs.writeFileSync( path.join(__dirname, 'index.html'), html, encoding);
}