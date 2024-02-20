function tsk_utils_get_navigator_friendly_name(){
    if(!__s_navigator_friendly_name){
        __s_navigator_friendly_name = 'unknown';
        if (navigator.userAgent || navigator.appName) {
            var ao_friendly_names = [
                {s_id: 'chrome', s_name: 'chrome'},
                {s_id: 'firefox', s_name: 'firefox'},
                {s_id: 'safari', s_name: 'safari'},
                {s_id: 'opera', s_name: 'opera'},
                {s_id: 'microsoft internet explorer', s_name: 'ie'},
                {s_id: 'netscape', s_name: 'netscape'}
            ];
            var s_userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : 'null';
            var s_appName = navigator.appName ? navigator.appName.toLowerCase() : 'null';
            for (var i_index = 0; i_index < ao_friendly_names.length; ++i_index) {
                if (s_userAgent.indexOf(ao_friendly_names[i_index].s_id) != -1 || s_appName.indexOf(ao_friendly_names[i_index].s_id) != -1) {
                    __s_navigator_friendly_name = ao_friendly_names[i_index].s_name;
                    break;
                }
            }
        }
    }
    return __s_navigator_friendly_name;
}