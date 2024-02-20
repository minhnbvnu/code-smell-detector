function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

    		let renderItem = renderItems[ renderItemsIndex ];
    		const materialProperties = properties.get( material );

    		if ( renderItem === undefined ) {

    			renderItem = {
    				id: object.id,
    				object: object,
    				geometry: geometry,
    				material: material,
    				program: materialProperties.program || defaultProgram,
    				groupOrder: groupOrder,
    				renderOrder: object.renderOrder,
    				z: z,
    				group: group
    			};

    			renderItems[ renderItemsIndex ] = renderItem;

    		} else {

    			renderItem.id = object.id;
    			renderItem.object = object;
    			renderItem.geometry = geometry;
    			renderItem.material = material;
    			renderItem.program = materialProperties.program || defaultProgram;
    			renderItem.groupOrder = groupOrder;
    			renderItem.renderOrder = object.renderOrder;
    			renderItem.z = z;
    			renderItem.group = group;

    		}

    		renderItemsIndex ++;

    		return renderItem;

    	}