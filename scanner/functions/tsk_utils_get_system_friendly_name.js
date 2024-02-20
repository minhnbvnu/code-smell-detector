function tsk_utils_get_system_friendly_name(){
    if(!__s_system_friendly_name){
        __s_system_friendly_name = 'unknown';
        if (navigator.appVersion) {
            var ao_friendly_names = [
                {s_id: 'mac', s_name: 'mac'},
                {s_id: 'powerpc', s_name: 'powerpc'},
                {s_id: 'win', s_name: 'windows'},
                {s_id: 'sunos', s_name: 'sunos'},
                {s_id: 'linux', s_name: 'linux'}
            ];
            var s_appVersion = navigator.appVersion.toLowerCase();
            for (var i_index = 0; i_index < ao_friendly_names.length; ++i_index) {
                if (s_appVersion.indexOf(ao_friendly_names[i_index].s_id) != -1) {
                    __s_system_friendly_name = ao_friendly_names[i_index].s_name;
                    break;
                }
            }
        }
    }
    return __s_system_friendly_name;
}