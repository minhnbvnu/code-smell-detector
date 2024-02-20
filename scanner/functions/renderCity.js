function renderCity(provinceCode){
            let tpl = '<option value="">--选择市--</option>';
            let cityList = getList('city', provinceCode.slice(0, 2));
            let currentCode = '';
            let currentName = '';
            cityList.forEach(function(_item){
                // if (!currentCode){
                //   currentCode = _item.code;
                //   currentName = _item.name;
                // }
                if(_item.name === options.data.city){
                    currentCode = _item.code;
                    currentName = _item.name;
                }
                tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
            });
            options.data.city = currentName;
            cityEl.html(tpl);
            cityEl.val(options.data.city);
            form.render('select');
            renderCounty(currentCode);
        }