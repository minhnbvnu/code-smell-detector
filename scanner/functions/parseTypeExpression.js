function parseTypeExpression(){var o,s;return B===u.QUESTION?(s=w-1,consume(u.QUESTION),maybeAddRange(B===u.COMMA||B===u.EQUAL||B===u.RBRACE||B===u.RPAREN||B===u.PIPE||B===u.EOF||B===u.RBRACK||B===u.GT?{type:i.NullableLiteral}:{type:i.NullableType,expression:parseBasicTypeExpression(),prefix:!0},[s,P])):B===u.BANG?(s=w-1,consume(u.BANG),maybeAddRange({type:i.NonNullableType,expression:parseBasicTypeExpression(),prefix:!0},[s,P])):(s=P,o=parseBasicTypeExpression(),B===u.BANG?(consume(u.BANG),maybeAddRange({type:i.NonNullableType,expression:o,prefix:!1},[s,P])):B===u.QUESTION?(consume(u.QUESTION),maybeAddRange({type:i.NullableType,expression:o,prefix:!1},[s,P])):B===u.LBRACK?(consume(u.LBRACK),expect(u.RBRACK,"expected an array-style type declaration ("+z+"[])"),maybeAddRange({type:i.TypeApplication,expression:maybeAddRange({type:i.NameExpression,name:"Array"},[s,P]),applications:[o]},[s,P])):o)}