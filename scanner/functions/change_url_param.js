function change_url_param(param_name, value, {replace_history_state=false}={}) {
	change_some_url_params({[param_name]: value}, {replace_history_state});
}