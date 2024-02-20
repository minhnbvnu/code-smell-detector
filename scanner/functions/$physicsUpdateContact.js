function $physicsUpdateContact(physics, contact, pair) {
    const activeContacts = pair.activeContacts;
    
    contact.normal.x = pair.collision.normal.x;
    contact.normal.y = pair.collision.normal.y;
    contact.point0.x = activeContacts[0].vertex.x;
    contact.point0.y = activeContacts[0].vertex.y;

    // For debugging contacts
    // $console.log(" update: ", contact.point0.x);
    
    if (activeContacts.length > 1) {
        if (! contact.point1) { contact.point1 = {}; }
        contact.point1.x = activeContacts[1].vertex.x;
        contact.point1.y = activeContacts[1].vertex.y;
    } else {
        contact.point1 = undefined;
    }
    contact.depth = pair.collision.depth;
    contact.$lastRealContactFrame = physics.$frame;
}