function getNumberType_unsupportedIterableToArray(i,o){if(i){if("string"==typeof i)return getNumberType_arrayLikeToArray(i,o);var s=Object.prototype.toString.call(i).slice(8,-1);return"Object"===s&&i.constructor&&(s=i.constructor.name),"Map"===s||"Set"===s?Array.from(i):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?getNumberType_arrayLikeToArray(i,o):void 0}}