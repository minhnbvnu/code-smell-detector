function HZ(){let e=typeof window<"u"&&window[Qhe]||typeof navigator<"u"&&(navigator.language||navigator.userLanguage)||"en-US";try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e="en-US"}return{locale:e,direction:qZ(e)?"rtl":"ltr"}}