function populateDemo( demo ){
  if( demo.github ){
    demo.githubUrl = 'https://github.com/' + demo.github;

    if( !demo.viewUrl ){ // use github pages url if unspecified
      let gh = demo.github.match(/([^/]+)\/([^/]+)/);

      demo.viewUrl = 'https://' + gh[1] + '.github.io/' + gh[2];
    }
  } else { // main repo demo
    demo.githubUrl = 'https://github.com/cytoscape/cytoscape.js/tree/master/documentation/demos/' + demo.id;
    demo.viewUrl = 'demos/' + demo.id;
  }

  demo.imgUrl = 'img/demos/' + demo.id + '.png';
}