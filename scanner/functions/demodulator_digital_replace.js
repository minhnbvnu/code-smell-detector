function demodulator_digital_replace(subtype)
{
    switch(subtype) 
    {
    case "bpsk31":
    case "rtty":
        secondary_demod_start(subtype);
        demodulator_analog_replace('usb', true);
        demodulator_buttons_update();
        break;
    }
    toggle_panel("openwebrx-panel-digimodes", true);
}