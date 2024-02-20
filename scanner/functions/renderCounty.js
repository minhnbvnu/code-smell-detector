function renderCounty(cityCode){
            let tpl = '<option value="">--选择区--</option>';
            let countyList = getList('county', cityCode.slice(0, 4));
            let currentCode = '';
            let currentName = '';
            countyList.forEach(function(_item){
                // if (!currentCode){
                //   currentCode = _item.code;
                //   currentName = _item.name;
                // }
                if(_item.name === options.data.county){
                    currentCode = _item.code;
                    currentName = _item.name;
                }
                tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
            });
            options.data.county = currentName;
            countyEl.html(tpl);
            countyEl.val(options.data.county);

            form.render('select');
        }