function Li(t){if(t=t.split("."),3!=t.length)return null;t=t[1];for(var n=(4-t.length%4)%4,e=0;e<n;e++)t+=".";try{var i=JSON.parse(On(t));if(i.sub&&i.iss&&i.aud&&i.exp)return new Di(i)}catch(t){}return null}