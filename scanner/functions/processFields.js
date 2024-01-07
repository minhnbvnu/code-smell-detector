function processFields( fields ){
  for( let i = 0; fields && i < fields.length; i++ ){
    let field = fields[i];

    field.descr = marked.parse( field.descr  || '' );

    linkifyArg( field );

    let subfields = field.fields;

    if( subfields ){
      processFields( subfields );
    }
  }
}