function resolve$1(i){var o=this;if(i&&"object"==typeof i&&i.constructor===o)return i;var s=new o(noop);return resolve(s,i),s}