function __tsip_transac_nist_onterm(o_self) {
    o_self.timer_cancel('J');

    return o_self.deinit();
}