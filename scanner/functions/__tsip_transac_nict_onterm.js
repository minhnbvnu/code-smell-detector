function __tsip_transac_nict_onterm(o_self) {
    o_self.timer_cancel('E');
    o_self.timer_cancel('F');
    o_self.timer_cancel('K');

    return o_self.deinit();
}