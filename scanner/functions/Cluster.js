function Cluster(options, body, imagelist, grouplist, globalOptions) {
      _classCallCheck(this, Cluster);

      _get(Object.getPrototypeOf(Cluster.prototype), 'constructor', this).call(this, options, body, imagelist, grouplist, globalOptions);

      this.isCluster = true;
      this.containedNodes = {};
      this.containedEdges = {};
    }