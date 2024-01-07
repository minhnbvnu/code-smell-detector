function createWindow() {
  var openWindow = window.open("./windowIndex.html", "_blank", "popup")

  openWindow.addEventListener("load", (event) => {
    var container = openWindow.document.createElement("div")
    container.className = "cy"  
    openWindow.document.body.appendChild(container);

    cytoscape({
      container: container,
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'background-color': '#B3767E',
            'width': 'mapData(baz, 0, 10, 10, 40)',
            'height': 'mapData(baz, 0, 10, 10, 40)',
            'content': 'data(id)'
          })
        .selector('edge')
          .css({
            'line-color': '#F2B1BA',
            'target-arrow-color': '#F2B1BA',
            'width': 2,
            'target-arrow-shape': 'circle',
            'opacity': 0.8
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black',
            'opacity': 1
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
    
      elements: elesJson,
    
      layout: {
        name: 'circle',
        padding: 10
      }
    });
  });


}