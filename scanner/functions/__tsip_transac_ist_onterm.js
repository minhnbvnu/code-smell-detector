function __tsip_transac_ist_onterm(o_self) {
    o_self.timer_cancel('H');
    o_self.timer_cancel('I');
    o_self.timer_cancel('G');
    o_self.timer_cancel('L');
    o_self.timer_cancel('X');

    return o_self.deinit();
}