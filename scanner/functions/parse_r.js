function parse_r(r){var terms=[[],"",[]];var t=r.match(tregex),cp=65001;if(!isval(t))return"";terms[1]=t[1];var rpr=r.match(rpregex);if(isval(rpr))cp=parse_rpr(rpr[1],terms[0],terms[2]);return terms[0].join("")+terms[1].replace(nlregex,"<br/>")+terms[2].join("")}