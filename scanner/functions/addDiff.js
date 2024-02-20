function addDiff(n,degree) {
            CToP.appendToken(bottomrow,'mo','\u2202');
            var bvar = bvarNames[n];
            if (degree>1) {
              var msup = CToP.createElement('msup');
              CToP.applyTransform(msup,bvar,0);
              CToP.appendToken(msup,'mn',degree);
              bottomrow.appendChild(msup);
            } else {
              CToP.applyTransform(bottomrow,bvar,0);
            }
          }