function yv(e){var r={sheet:1};Tv.forEach(function(t){if(e[t]!=null&&e[t])r[t]="1"});Ev.forEach(function(t){if(e[t]!=null&&!e[t])r[t]="0"});if(e.password)r.password=mo(e.password).toString(16).toUpperCase();return xt("sheetProtection",null,r)}