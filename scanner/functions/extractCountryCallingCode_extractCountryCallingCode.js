function extractCountryCallingCode_extractCountryCallingCode(i,o,s,u){if(!i)return{};if("+"!==i[0]){var C=stripIddPrefix(i,o,s,u);if(!C||C===i){if(o||s){var _=extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(i,o,s,u),w=_.countryCallingCode,P=_.number;if(w)return{countryCallingCode:w,number:P}}return{number:i}}i="+"+C}if("0"===i[1])return{};u=new Y(u);for(var B=2;B-1<=3&&B<=i.length;){var z=i.slice(1,B);if(u.hasCallingCode(z))return u.selectNumberingPlan(z),{countryCallingCode:z,number:i.slice(B)};B++}return{}}