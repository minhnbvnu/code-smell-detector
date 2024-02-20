function renderProvince(){
            let tpl = '<option value="">--选择省--</option>';
            let provinceList = getList("province");
            let currentCode = '';
            let currentName = '';
            provinceList.forEach(function(_item){
                // if (!currentCode){
                //   currentCode = _item.code;
                //   currentName = _item.name;
                // }
                if(_item.name === options.data.province){
                    currentCode = _item.code;
                    currentName = _item.name;
                }
                tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
            });
            provinceEl.html(tpl);
            provinceEl.val(options.data.province);
            form.render('select');
            renderCity(currentCode);
        }