function isOrContainsNode(parent,child,environment){return parent===child||child instanceof environment.Node&&parent.contains&&parent.contains(child)}