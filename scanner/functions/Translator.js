constructor(lang) {
        super();

        this.languages = {
            'zh-CN': zhCn,
            'es-MX': esMX,
            'en-US': enUS
        };
        this.nodes = {};
        this.setLang(lang || 'zh-CN');
    }