function findBodyTag(html) {
  // get the body tag
  try{
    return html.match(/<body(?=[\s>])(.*?)>/gi)[0];
  }catch(e){}
}