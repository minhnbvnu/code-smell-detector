function getPdfColor(t,r){if(t[0]===t[1]&&t[1]===t[2]){var o=t[0]/255;return"".concat((0,c.numberToString)(o)," ").concat(r?"g":"G")}return Array.from(t).map((function(t){return(0,c.numberToString)(t/255)})).join(" ")+" ".concat(r?"rg":"RG")}