function tsk_param_create(s_name, s_value) {
    var self = new Object();
    self.s_name = s_name;
    self.s_value = s_value;
    self.b_tag = false;
    return self;
}