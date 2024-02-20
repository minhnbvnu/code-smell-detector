async function blockCategory(id, name) {
    let value = Cookies.get("HideCategories") || "0";
    if (value.split(",").indexOf(id + "") > -1) {
        await swal({
            title: "确认移除屏蔽【" + name + "】吗？",
            text: "移除屏蔽之后可能会出现一些引起不适的内容，请谨慎操作，确认关闭吗？",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            showLoaderOnConfirm: true,
            animation: true,
            allowOutsideClick: false
        }).then(async function() {
            Cookies.set("HideCategories", value.split(",").filter(function(item) { return item != id }).join(","), { expires: 365 });
            swal({
                text: "取消屏蔽成功",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            }).catch(swal.noop);
        }, function() {}).catch(swal.noop);
    } else {
        await swal({
            title: "确认屏蔽【" + name + "】吗？",
            text: "屏蔽之后将不再收到该分类的相关推送！若需要取消屏蔽，清除本站的浏览器缓存即可。",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            showLoaderOnConfirm: true,
            animation: true,
            allowOutsideClick: false
        }).then(async function() {
            Cookies.set("HideCategories", id + "," + value, { expires: 365 });
            swal({
                text: "屏蔽成功",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            }).catch(swal.noop);
        }, function() {}).catch(swal.noop);
    }
}