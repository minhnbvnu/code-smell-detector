function V7e(e){var t,r,i;if(i=e.input.charCodeAt(e.position),i!==42)return!1;for(i=e.input.charCodeAt(++e.position),t=e.position;i!==0&&!Bn(i)&&!r1(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&Bt(e,"name of an alias node must contain at least one character"),r=e.input.slice(t,e.position),e.anchorMap.hasOwnProperty(r)||Bt(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],Yi(e,!0,-1),!0}