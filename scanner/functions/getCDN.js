function getCDN(script) {
     if (!script) return;
     var cdn = script.src.replace(/https:\/\//,'').replace(/[\/\?].*/,'');
     return CDN[cdn];
   }