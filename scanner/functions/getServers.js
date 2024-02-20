function getServers() {
    window.fetch("/system/GetServers", {
        credentials: 'include',
        method: 'GET',
        mode: 'cors'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        var arr=[];
        for (var i = 0; i < data.length; i++) {
            arr.push({name:data[i],value:data[i]});
        }

        xmSelect.render({
            el: '#servers',
            tips: '请选择服务器',
            model: {
                 icon: 'hidden',
                 label: { type: 'text' }
            },
            radio: true,
            clickClose: true,
            autoRow: true, //选项过多,自动换行
            data:arr,
            on: function (data) {
                if (data.arr.length>0) {
                    showLine(data.arr[0].value);
                }
            }
        });
    });
}