function Ye(t){if(t._f!==r.ISO_8601)if(t._f!==r.RFC_2822){t._a=[],p(t).empty=!0;var e,i,n,o,s,a=""+t._i,h=a.length,l=0;for(n=B(t._f,t._locale).match(H)||[],e=0;e<n.length;e++)o=n[e],(i=(a.match(dt(o,t))||[])[0])&&((s=a.substr(0,a.indexOf(i))).length>0&&p(t).unusedInput.push(s),a=a.slice(a.indexOf(i)+i.length),l+=i.length),U[o]?(i?p(t).empty=!1:p(t).unusedTokens.push(o),gt(o,i,t)):t._strict&&!i&&p(t).unusedTokens.push(o);p(t).charsLeftOver=h-l,a.length>0&&p(t).unusedInput.push(a),t._a[bt]<=12&&!0===p(t).bigHour&&t._a[bt]>0&&(p(t).bigHour=void 0),p(t).parsedDateParts=t._a.slice(0),p(t).meridiem=t._meridiem,t._a[bt]=function(t,e,i){var n;return null==i?e:null!=t.meridiemHour?t.meridiemHour(e,i):null!=t.isPM?((n=t.isPM(i))&&e<12&&(e+=12),n||12!==e||(e=0),e):e}(t._locale,t._a[bt],t._meridiem),_e(t),ve(t)}else Ee(t);else Me(t)}