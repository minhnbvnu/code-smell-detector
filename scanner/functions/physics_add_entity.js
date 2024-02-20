function physics_add_entity(physics, entity) {
    if (! physics) { $error("physics context cannot be nil"); }
    if (! physics.$engine) { $error("First argument to physics_add_entity() must be a physics context."); }
    if (entity.$body) { $error("This entity is already in a physics context"); }
    if (entity.density <= 0) { $error("The entity in physics_add_entity() must have nonzero density"); }

    push(physics.$entityArray, entity);
    const engine = physics.$engine;
   
    const params = {isStatic: entity.density === Infinity};

    switch (entity.shape) {
    case "rect":
        entity.$body = $Physics.Bodies.rectangle(entity.pos.x, entity.pos.y, entity.size.x * entity.scale.x, entity.size.y * entity.scale.y, params);
        break;
        
    case "disk":
        entity.$body = $Physics.Bodies.circle(entity.pos.x, entity.pos.y, 0.5 * entity.size.x * entity.scale.x, params);
        break;

    default:
        $error('Unsupported entity shape for physics_add_entity(): "' + entity.shape + '"');
    }

    entity.$body.collisionFilter.group = -entity.contact_group;
    entity.$body.entity = entity;
    entity.$body.slop = 0.075; // 0.05 is the default. Increase to make large object stacks more stable.
    entity.$attachmentArray = [];
    $Physics.World.add(engine.world, entity.$body);

    $bodyUpdateFromEntity(entity.$body);

    return entity;
}