function getChildren(elm, tagName) {
        if(!tagName) tagName = '*';
        if (typeof elm.length != 'undefined') {
            var all = []; //, ret = [], hash = {};
            forEach.call(elm, function (ii) {
                forEach.call(getChildren(ii, tagName), function(ce){
                  all.push(ce);
                });
            });

            //need a way to make sure the list is distinct
            return all; //ret;
        }

        var tags = tagName.split(' ');
        if(tags.length > 1){
          var all = [];
          forEach.call(tags, function (ii) {
            forEach.call(getChildren(elm, ii), function(ce){
              all.push(ce);
            });
          });

          return all;
        }

        return elm.all && tagName == '*' ? elm.all : elm.getElementsByTagName(tagName);
    }