function compileConfig( config ){
  let sections = config.sections;
  let parent = config;

  for( let i = 0; sections && i < sections.length; i++ ){
    let section = sections[i];

    if (section.mdTemplate) {
      section.html = templateToHtml(section);
      let psubs = parseSubsections( section );

      let subs = section.sections = section.sections || [];
      section.sections = subs.concat( psubs );
    }

    if( section.layout ){ section.name = section.layout.name; }

    section.id = (parent.name ? (toUrl(parent.name) + '/') : '') + toUrl( section.name );
    section.bookmark = makeBookmark( section.id );

    if( section.md ){
      section.html = md2html( section.md );

      let psubs = parseSubsections( section );

      let subs = section.sections = section.sections || [];
      section.sections = subs.concat( psubs );
    }

    if( section.mddescr ){
      section.descr = md2html( section.mddescr );
    }

    if( section.demos ){
      let demos = section.demos;

      for( let j = 0; j < demos.length; j++ ){
        let demo = demos[j];

        populateDemo( demo );
      }
    }

    if( section.demo ){
      populateDemo( section.demo );
    }

    if( section.layout ){
      let layout = section.layout;

      section.name = layout.name;
      layout.code = fs.readFileSync( path.join(__dirname, '../src/extensions/layout/' + layout.name + '.js'), 'utf8' );

      try {
        layout.options = layout.code.match(/defaults\s*\=\s*(\{(?:.|\s)+?\}\;)/)[1];

        let lopts = layout.options;

        // cleanup indent
        lopts = lopts.replace(/\n[ ]{4}/g, '\n  ');
        lopts = lopts.replace(/[ ]{2}\}\;/g, '};');

        // add name
        lopts = lopts.replace(/\{/, '{\n  name: \'' + layout.name + '\',\n');

        // wrap w/ code
        lopts = 'let options = ' + lopts + '\n\ncy.layout( options );';

        // highlight
        lopts = hljs.highlight('js', lopts).value;

        layout.optionsFormatted = lopts;
      } catch(e){
        throw 'Error processing layout options for `'+ layout.name +'`; must have `defaults = { ... };`';
      }
    }

    if( section.fns ){
      let fns = section.fns;
      for( let j = 0; j < fns.length; j++ ){
        let fn = fns[j];

        fn.altIds = [];

        fn.altIds.push( section.id + '/' + fn.name );
        fn.id = fn.name;
        fn.bookmark = makeBookmark( fn.id );
        fn.descr = fn.descr ? marked.parse( fn.descr ) : undefined;

        if( fn.md ){
          fn.html = md2html( fn.md );

          // the html for functions should only have h3 tags, not h1 or h2
          fn.html = fn.html.replace(/\<h2/g, '<h3');
          fn.html = fn.html.replace(/\<\/h2\>/g, '</h3>');
          fn.html = fn.html.replace(/\<h1/g, '<h3');
          fn.html = fn.html.replace(/\<\/h1\>/g, '</h3>');
        }

        if( fn.pureAliases ){
          fn.pureAliases.forEach(function( aId ){
            fn.altIds.push( section.id + '/' + aId );
            fn.altIds.push( aId );
          });
        }

        let formatsHaveDiffNames = false;
        if( fn.formats ){
          let formats = fn.formats;

          for( let k = 0; k < formats.length; k++ ){
            let format = formats[k];

            format.name = format.name || fn.name; // copy name to format if not specified
            format.descr = marked.parse( format.descr || '' );

            fn.altIds.push( section.id + '/' + format.name );
            fn.altIds.push( format.name );

            if( format.args ){
              for( let m = 0; m < format.args.length; m++ ){
                let arg = format.args[m];

                linkifyArg( arg );

                arg.descr = marked.parse( arg.descr || '' );

                processFields( arg.fields );
              }
            }

            if( format.name !== fn.name ){
              formatsHaveDiffNames = true;
            }

            compileAliases( section, format );
          }
        } // if

        // mark as diff names
        if( formatsHaveDiffNames ){
          fn.aliases = true;
        }

        compileAliases( section, fn );

      } // for

      // sort functions by name within a section
      // fns.sort(function(a, b){
      //   return a.name.toLowerCase() > b.name.toLowerCase();
      // });
    }

    if( section.sections ){ // then compile those subsections too
      compileConfig( section );
    }
  }
}