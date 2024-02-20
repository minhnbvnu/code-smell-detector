function make_physics(options) {
    const engine = $Physics.Engine.create();
    const physics = Object.seal({
        $name:                 "physics" + ($physicsContextIndex++),
        $engine:               engine,
        $contactCallbackArray: [],
        $newContactArray:      [], // for firing callbacks and visualization. wiped every frame

        $frame:                0,

        // Lock for when within simulation
        $inSimulate:           false,
        
        // To be removed when physics_simulate ends
        $removeEntityArray:   [],
        
        // $brokenContactQueue[0] is an array of contacts that broke $brokenContactQueue.length - 1
        // frames ago (but may have been reestablished). Add empty arrays to this queue to maintain
        // old contacts for more frames so that bouncing/sliding contact feels more robust.
        $brokenContactQueue:   [[], [], [], []],
        
        // Maps bodies to maps of bodies to contacts.
        $entityContactMap:     new Map(), 

        // All entities in this physics context
        $entityArray:          []})
    
    options = options || {}
   
    if (options.gravity) {
        engine.world.gravity.x = options.gravity.x;
        engine.world.gravity.y = options.gravity.y;
    } else {
        engine.world.gravity.y = -up_y();
    }
      
    engine.world.gravity.scale = 0.001; // default 0.001
    engine.enableSleeping = true;
    if (options.allow_sleeping === false || options.allowSleeping === false) {
        engine.enableSleeping = false;
    }

    // Higher improves compression under large stacks or
    // small objects.  Too high causes instability.
    engine.positionIterations   = 12; // default 6

    // Higher improves processing of fast objects and thin walls.
    // Too high causes instability.
    engine.velocityIterations   = 14; // default 4
    engine.constraintIterations = 4;  // default 2. Higher lets more chained constraints propagate.

    // Extra constraints enforced by quadplay
    engine.customAttachments = [];
        
    // Allows slowmo, etc.
    // engine.timing.timeScale = 1

    $Physics.Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;
        for (let i = 0; i < pairs.length; ++i) {
            const pair = pairs[i];
            const activeContacts = pair.activeContacts;

            // Create the map entries if they do not already exist
            let mapA = physics.$entityContactMap.get(pair.bodyA);
            if (mapA === undefined) { physics.$entityContactMap.set(pair.bodyA, mapA = new Map()); }

            let mapB = physics.$entityContactMap.get(pair.bodyB);
            if (mapB === undefined) { physics.$entityContactMap.set(pair.bodyB, mapB = new Map()); }
            
            let contact = mapA.get(pair.bodyB);
            
            if (! contact) {
                // This new contact will not appear in the
                // collisionActive event for one frame, so update
                // the properties right now
                contact = {
                    entityA: pair.bodyA.entity,
                    entityB: pair.bodyB.entity,
                    normal:  {x: pair.collision.normal.x, y: pair.collision.normal.y},
                    point0:  {x: activeContacts[0].vertex.x, y: activeContacts[0].vertex.y},
                    point1:  (activeContacts.length === 1) ? undefined : {x: activeContacts[1].vertex.x, y: activeContacts[1].vertex.y},
                    depth:   pair.collision.depth
                }

                // For use in collision callbacks
                physics.$newContactArray.push(contact);

                // For use in queries
                mapA.set(pair.bodyB, contact);
                mapB.set(pair.bodyA, contact);

                // for debugging collisions
                //$console.log(physics.$frame + ' +begin ' + contact.entityA.name + " & " + contact.entityB.name);
            } else {
                $console.assert(mapB.get(pair.bodyA), 'Internal error: Mismatched contact pair in physics simulation');
                // ...else: this contact already exists and is in the maps because it was recently active.
                // it is currently scheduled in the broken contact queue. Update the data; the Active
                // event will not be called by Matter.js

                // for debugging collisions
                //$console.log(physics.$frame + ' resume ' + contact.entityA.name + " & " + contact.entityB.name);
                $physicsUpdateContact(physics, contact, pair);
            }
            
            contact.$lastRealContactFrame = physics.$frame;                
        }
    });

    $Physics.Events.on(engine, 'collisionActive', function (event) {
        const pairs = event.pairs;
        for (let i = 0; i < pairs.length; ++i) {
            const pair = pairs[i];

            // We could fetch from A and then B or B and then A. Both give the same
            // result.
            const contact = physics.$entityContactMap.get(pair.bodyA).get(pair.bodyB);

            if (! contact) {
                // Something went wrong and matter.js has just updated us about a
                // contact that is no longer active. Ignore it.
                continue;
            }
            
            // for debugging collisions
            // $console.log(physics.$frame + ' active ' + contact.entityA.name + " & " + contact.entityB.name);
            $physicsUpdateContact(physics, contact, pair);
        }
    });

    $Physics.Events.on(engine, 'collisionEnd', function (event) {
        // Schedule collisions for removal
        const pairs = event.pairs;
        const removeArray = last_value(physics.$brokenContactQueue);
        for (let i = 0; i < pairs.length; ++i) {
            const pair = pairs[i];

            if (pair.isActive) {
                // Active contacts should never end
                continue;
            }
            
            // Find the contact (Note that it may have already been
            // removed, or the object itself may have been removed
            // from physics in a previous frame)
            const map = physics.$entityContactMap.get(pair.bodyA);
            if (map) {
                const contact = map.get(pair.bodyB);
                
                // If not already removed
                if (contact) {
                    // A potential improvement to add here later: if
                    // moving with high velocity away from the contact,
                    // then maybe end the contact immediately
                    
                    // for debugging collisions
                    //$console.log(physics.$frame + ' (brk)  ' + contact.entityA.name + " & " + contact.entityB.name);
                    
                    // Schedule the contact for removal. It can gain a reprieve if is updated
                    // before it hits the front of the queue.
                    removeArray.push(contact);
                }
            } // if map
        }
    });
        
    return physics;
}