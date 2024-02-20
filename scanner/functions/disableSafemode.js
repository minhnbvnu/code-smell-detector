async function disableSafemode() {
    await swal({
        title: "确认关闭安全模式吗？",
        text: "关闭安全模式后可能会出现一些引起不适的内容，请谨慎操作，确认关闭吗？",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showLoaderOnConfirm: true,
        animation: true,
        allowOutsideClick: false
    }).then(async function() {
        Cookies.set("Nsfw", 0, { expires: 3650 });
        location.reload();
    }, function() {}).catch(swal.noop);
}