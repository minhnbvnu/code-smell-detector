function __tsip_transac_ict_onterm(o_self) {
    o_self.timer_cancel('A');
    o_self.timer_cancel('B');
    o_self.timer_cancel('D');
    o_self.timer_cancel('M');

    return o_self.deinit();
}