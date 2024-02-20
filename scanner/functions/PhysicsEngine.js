function PhysicsEngine(body) {
      _classCallCheck(this, PhysicsEngine);

      this.body = body;
      this.physicsBody = { physicsNodeIndices: [], physicsEdgeIndices: [], forces: {}, velocities: {} };

      this.physicsEnabled = true;
      this.simulationInterval = 1000 / 60;
      this.requiresTimeout = true;
      this.previousStates = {};
      this.freezeCache = {};
      this.renderTimer = undefined;
      this.initialStabilizationEmitted = false;

      this.stabilized = false;
      this.startedStabilization = false;
      this.stabilizationIterations = 0;
      this.ready = false; // will be set to true if the stabilize

      // default options
      this.options = {};
      this.defaultOptions = {
        enabled: true,
        barnesHut: {
          theta: 0.5,
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        forceAtlas2Based: {
          theta: 0.5,
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springConstant: 0.08,
          springLength: 100,
          damping: 0.4,
          avoidOverlap: 0
        },
        repulsion: {
          centralGravity: 0.2,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 100,
          damping: 0.09,
          avoidOverlap: 0
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09
        },
        maxVelocity: 50,
        minVelocity: 0.1, // px/s
        solver: 'barnesHut',
        stabilization: {
          enabled: true,
          iterations: 1000, // maximum number of iteration to stabilize
          updateInterval: 50,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5
      };
      util.extend(this.options, this.defaultOptions);

      this.bindEventListeners();
    }