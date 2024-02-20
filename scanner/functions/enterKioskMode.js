function enterKioskMode() {
    inPageReload = true;
    location = location.origin + location.pathname + '?kiosk=1';
}