function parse_theme_xml(data,opts){if(!data||data.length===0)return themes;var t;if(!(t=data.match(themeltregex)))throw"themeElements not found in theme";parse_themeElements(t[0],opts);return themes}