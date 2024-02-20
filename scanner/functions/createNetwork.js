function createNetwork(alert_id, relatedAlerts, nb_nodes, containerId, containerConfigureId) {
  const { nodes, edges } = relatedAlerts;

  if (nodes.length === 0 || nodes.length === undefined) {
      $(`#similarAlertsNotify-${alert_id}`).text(`No relationships found for this alert`);
     return;
  }

  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  };

  const options = {
    edges: {
      smooth: {
            enabled: true,
            type: 'continuous',
            roundness: 0.5
        }
    },
    layout: {
        randomSeed: 2,
        improvedLayout: true
    },
    interaction: {
      hideEdgesOnDrag: false,
        tooltipDelay: 100
    },
    height: (window.innerHeight- 250) + "px",
    clickToUse: true,
    physics: {
        forceAtlas2Based: {
          gravitationalConstant: -167,
          centralGravity: 0.04,
          springLength: 0,
          springConstant: 0.02,
          damping: 0.9
        },
        minVelocity: 0.41,
        solver: "forceAtlas2Based",
        timestep: 0.45
    }
  };

    const container = document.getElementById(containerId);
    const network = new vis.Network(container, data, options);

    // Create a MutationObserver to listen for DOM changes in the container
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          network.redraw(); // Force a redraw when the DOM is updated
          break;
        }
      }
    });

    // Start observing the container for DOM changes
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    network.on("stabilizationIterationsDone", function () {
        network.setOptions( { physics: false } );
    });

    let selectedNodeId = null;
    let node_type = null;
    let node_id = null;


    network.on('oncontext', (event) => {
      event.event.preventDefault();

      const nodeId = network.getNodeAt(event.pointer.DOM);

      if (nodeId) {

          selectedNodeId = nodeId;
          node_type = selectedNodeId.split('_')[0];
          node_id = selectedNodeId.split('_')[1];

          if (node_type === 'alert' || node_type === 'case' || node_type === 'asset' || node_type === 'ioc') {
              // Get the offset of the container element.
              const containerOffset = getAlertOffset(container);

              const x = event.pointer.DOM.x + 110;
              const y = containerOffset.top + event.pointer.DOM.y;

              const contextMenu = $('#context-menu-relationships');
              contextMenu.css({
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y}px`
              })

              $('#view-alert').data('node-id', node_id);
              $('#view-alert').data('node-type', node_type);
              if (node_type === 'alert' || node_type === 'case') {
                  $('#view-alert-text').text(`View on ${node_type} #${node_id}`);
              } else {
                    $('#view-alert-text').text(`Pivot on ${node_type} ${node_id}`);
              }
              contextMenu.show();
          }
      }
    });

    document.addEventListener('click', () => {
      const contextMenu = $('#context-menu-relationships');
      contextMenu.hide();
    });

      if (nodes.length >= nb_nodes) {
            $(`#similarAlertsNotify-${alert_id}`).text(`Relationships node exceeded the nodes limit. Expect truncated results.`)
      } else {
            $(`#similarAlertsNotify-${alert_id}`).text(``);
      }

}