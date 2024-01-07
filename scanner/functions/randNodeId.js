function randNodeId(){
      return nodes[ Math.round(Math.random() * (nodes.length - 1)) ].data.id;
    }