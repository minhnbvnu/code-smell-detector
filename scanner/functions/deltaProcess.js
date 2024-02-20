function deltaProcess (collection, delta) {
        
        var i = [];   //inserted item
        var d = [];   //deleted item
        var u = [];   //updated item

        delta.forEach(function(item){

            if (item.type === 'insert') {
                i.push(item.cnt);
            } else if (item.type === 'delete') {
                item.cnt.forEach(function(smr_id){
                    d.push(smr_id);    
                });
            } else if (item.type === 'update') {
                var cnt = item.cnt;
                var smr_id = item.id;
                item.cnt.forEach(function(upd){
                    u.push({
                        cnt : upd.cnt,
                        smr_id : smr_id
                    });
                });
            }

        });

        if(i.length){ collection.onInsert && collection.onInsert(i); }
        if(d.length){ collection.onDelete && collection.onDelete(d); }
        if(u.length){ collection.onUpdate && collection.onUpdate(u); }

    }