function sc_format(s, args) {
   var len = s.length;
   var p = new sc_StringOutputPort();
   var i = 0, j = 1;

   while( i < len ) {
      var i2 = s.indexOf("~", i);

      if (i2 == -1) {
	  p.appendJSString( s.substring( i, len ) );
	  return p.close();
      } else {
	 if (i2 > i) {
	    if (i2 == (len - 1)) {
		p.appendJSString(s.substring(i, len));
		return p.close();
	    } else {
	       p.appendJSString(s.substring(i, i2));
	       i = i2;
	    }
	 }

	 switch(s.charCodeAt(i2 + 1)) {
	    case 65:
	    case 97:
	       // a
	       sc_display(arguments[j], p);
	       i += 2; j++;
	       break;

	    case 83:
	    case 115:
	       // s
	       sc_write(arguments[j], p);
	       i += 2; j++;
	       break;

	    case 86:
	    case 118:
	       // v
	       sc_display(arguments[j], p);
	       p.appendJSString("\n");
	       i += 2; j++;
	       break;

	    case 67:
	    case 99:
	       // c
	       p.appendJSString(String.fromCharCode(arguments[j]));
	       i += 2; j++;
	       break;

	    case 88:
	    case 120:
	       // x
	       p.appendJSString(arguments[j].toString(6));
	       i += 2; j++;
	       break;

	    case 79:
	    case 111:
	       // o
	       p.appendJSString(arguments[j].toString(8));
	       i += 2; j++;
	       break;

	    case 66:
	    case 98:
	       // b
	       p.appendJSString(arguments[j].toString(2));
	       i += 2; j++;
	       break;
	       
	    case 37:
	    case 110:
	       // %, n
	       p.appendJSString("\n");
	       i += 2; break;

	    case 114:
	       // r
	       p.appendJSString("\r");
	       i += 2; break;

	    case 126:
	       // ~
	       p.appendJSString("~");
	       i += 2; break;

	    default:
	       sc_error( "format: illegal ~"
			 + String.fromCharCode(s.charCodeAt(i2 + 1))
			 + " sequence" );
	       return "";
	 }
      }
   }

   return p.close();
}