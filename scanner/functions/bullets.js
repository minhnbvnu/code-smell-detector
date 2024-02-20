function bullets (text) {
    // $code = "";
    // s/^\s*$/<p><\/p>/                && ($code = '...');
    // s/^(\t+)(.+):\t/<dt>$2<dd>/      && &enter('DL', length $1);
    // s/^(\t+)\*/<li>/                 && &enter('UL', length $1);
    // s/^(\*+)/<li>/                   && &enter('UL', length $1);
    // s/^(\t+)\d+\.?/<li>/             && &enter('OL', length $1);
    // /^\s/                            && &enter('PRE', 1);
    code = ''
    let result = text
      .replace(/^\s*$/,                 enter('...', '<p></p>' ) )
      .replace(/^(\t+)(.+):\t/,         enter('DL',  '<dt>{p2}<dd>') )
      .replace(/^(\t+)\*/,              enter('UL',  '<li>') )
      .replace(/^(\*+)/,                enter('UL',  '<li>') )
      .replace(/^(\t+)\d+\.?/,          enter('OL',  '<li>') )
      .replace(/^(\s)/,                 enter('PRE', '{p1}') )
    return result
  }