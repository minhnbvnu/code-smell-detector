function qAe(e){var t=e[0];if(typeof t!="string")return e;var r=t.lastIndexOf("{text}");return r===t.length-6?(e[0]=t.replace(/\s?{text}/,""),e):[t.replace("{text}",LAe.toString(e.slice(1)))]}