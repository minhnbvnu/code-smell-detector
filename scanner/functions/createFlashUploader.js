function createFlashUploader(opt, callbacks) {
    //由于lang.flashI18n是静态属性，不可以直接进行修改，否则会影响到后续内容
    var i18n = utils.extend({},lang.flashI18n);
    //处理图片资源地址的编码，补全等问题
    for(var i in i18n){
        if(!(i in {"lang":1,"uploadingTF":1,"imageTF":1,"textEncoding":1}) && i18n[i]){
            i18n[i] = encodeURIComponent(editor.options.langPath + editor.options.lang + "/images/" + i18n[i]);
        }
    }
    opt = utils.extend(opt,i18n,false);
	var option = {
		createOptions:{
			id:'flash',
			url:opt.flashUrl,
			width:opt.width,
			height:opt.height,
			errorMessage:lang.flashError,
			wmode:browser.safari ? 'transparent' : 'window',
			ver:'10.0.0',
			vars:opt,
			container:opt.container
		}
	};

	option = extendProperty(callbacks, option);
	flashObj = new baidu.flash.imageUploader(option);
    flashContainer = $G(opt.container);
}