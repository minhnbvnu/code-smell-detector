function compileAliases( section, fn ){
  if( fn.pureAliases ){
    let procdAliases = [];

    for( let k = 0; k < fn.pureAliases.length; k++ ){
      let pa = '' + fn.pureAliases[k];

      procdAliases.push({
        name: pa,
        id: section.id + '/' + pa
      });
    }

    fn.processedPureAliases = procdAliases;
  }
}