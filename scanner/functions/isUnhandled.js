function isUnhandled(promise){var record=promise[RECORD],chain=record.a,i=0,react;if(record.h)return false;while(chain.length>i){react=chain[i++];if(react.fail||!isUnhandled(react.P))return false}return true}