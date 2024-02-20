function zIe(){if(Pte){if(!lo)try{let r=G_("chcp").toString().split(`\r
`)[0].split(":");lo=r.length>1?r[1].replace(".",""):""}catch{lo="437"}return lo}if(CIe||DIe||kIe||TIe||AIe){if(!lo)try{let r=G_("echo $LANG").toString().split(`\r
`)[0].split(".");lo=r.length>1?r[1].trim():"",lo||(lo="UTF-8")}catch{lo="UTF-8"}return lo}}