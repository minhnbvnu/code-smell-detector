function getVertexByIndex( index, vertex ) {

    			const stride = index * 3;

    			vertex.x = vertices[ stride + 0 ];
    			vertex.y = vertices[ stride + 1 ];
    			vertex.z = vertices[ stride + 2 ];

    		}