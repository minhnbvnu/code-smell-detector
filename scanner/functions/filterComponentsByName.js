function filterComponentsByName(i,o){var s=getFilterRegExp(o);return i.filter((function(i){var o=i.name;return s.test(o)}))}