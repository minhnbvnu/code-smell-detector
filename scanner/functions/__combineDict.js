function __combineDict({ dict, dictDefault }) {
    const dictNew = Vue.prototype.$meta.util.extend({}, dict);
    for (const dictItemDefault of dictDefault._dictItems) {
      const codeB = dictItemDefault.code < 0 ? 1000 - dictItemDefault.code : dictItemDefault.code;
      const index = dictNew._dictItems.findIndex(item => {
        let codeA;
        if (typeof item.code === 'string') {
          codeA = 1000;
        } else {
          codeA = item.code < 0 ? 1000 - item.code : item.code;
        }
        return codeA >= codeB;
      });
      if (index === -1) {
        dictNew._dictItems.push(dictItemDefault);
        dictNew._dictItemsMap[dictItemDefault.code] = dictItemDefault;
      } else {
        const dictItemNew = dictNew._dictItems[index];
        if (dictItemNew.code === dictItemDefault.code) {
          // do nothing if exists
        } else {
          dictNew._dictItems.splice(index, 0, dictItemDefault);
          dictNew._dictItemsMap[dictItemDefault.code] = dictItemDefault;
        }
      }
    }
    return dictNew;
  }