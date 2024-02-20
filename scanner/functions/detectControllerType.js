function detectControllerType(id) {
    let type = controllerTypeTable[id];
    
    if (type === undefined) {
        // Not previously observed on this machine. Apply heuristics
        if (/ps3|playstation(r)3/i.test(id)) {
            type = 'PlayStation3';
        } else if (/ps4|playstation/i.test(id)) {
            type = 'PlayStation4';
        } else if (/joy-con (r)/i.test(id)) {
            type = 'JoyCon_R';
        } else if (/joy-con (l)/i.test(id)) {
            type = 'JoyCon_L';
        } else if (/joy-con/i.test(id)) {
            type = 'JoyCon_R';
        } else if (/stadia/i.test(id)) {
            type = 'Stadia';
        } else if (/xbox 360/i.test(id)) {
            type = 'Xbox360';
        } else if (/x-box 360 pad/i.test(id)) {
            type = 'SteamDeck';
        } else if (/xbox|xinput/i.test(id)) {
            type = 'Xbox';
        } else if (/snes/i.test(id)) {
            type = 'SNES';
        } else if (/8bitdo +s[fn]30/i.test(id)) {
            type = 'SNES';
        } else if (/8bitdo +zero/i.test(id)) {
            type = 'Zero';
        } else if (/hotas/i.test(id)) {
            type = 'HOTAS';
        } else if (id === 'DB9 to USB v2.0 (Vendor: 289b Product: 004a)') {
            type = 'Genesis';
        } else {
            type = 'Quadplay';
        }
    }
    
    return type;
}