class Node {
  constructor(name, elevation) {
    this.name = name;
    this.elevation = elevation;
  }

  toString() {
    return this.name;
  }
}

class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node.name] = [];
  }

  addEdge(node1, node2, weight = 1) {
    this.edges[node1.name].push({ node: node2, weight: weight });
    this.edges[node2.name].push({ node: node1, weight: weight });
  }

  addDirectedEdge(node1, node2, weight = 1) {
    this.edges[node1.name].push({ node: node2, weight: weight });
  }

  display() {
    let graph = '';
    this.nodes.forEach(node => {
      graph += node.name + '->' + this.edges[node.name].map(n => n.node.name).join(', ') + '\n';
    });
    console.log(graph);
  }

  getShortestEdge(source, currentDirection) {
    let nearest = 0;

    for (let i = 1; i < this.edges[source.name].length; i++) {
      const currentNearestNode = this.edges[source.name][nearest];
      const currentNode = this.edges[source.name][i];

      // compare weight of current edge to the current nearest edge to see if the former is less
      if (currentNode.weight < currentNearestNode.weight) {
        // if we reached source node by moving higher in elevation, then we can choose any next node
        if (currentDirection === 'up') {
          nearest = i;
          // if we reached source node by moving lower in elevation, we must choose a node that continues that decrease in elevation
        } else {
          if (currentNode.elevation <= source.elevation) {
            nearest = i;
          }
        }
      }
    }
    return this.edges[source.name][nearest];
  }

  dijkstra(source) {
    // vertex set is this.nodes
    let nodes = [...this.nodes];

    const dist = {
      up: {},
      down: {},
    };

    const prev = {
      up: {},
      down: {},
    };

    let currentNode = source;

    let currentDirection = 'up';
    let nextDirection = 'up';

    nodes.forEach(node => {
      dist.up[node.name] = null;
      dist.down[node.name] = null;
      prev.up[node.name] = null;
      prev.down[node.name] = null;
    });

    while (nodes.length) {
      debugger;
      // this is run every time we complete a cycle
      if (currentNode.name === source.name && !nodes.find(node => node.name === source.name)) {
        console.log('Cycle reaced and resetting currentNode to ', nodes[0]);
        currentNode = nodes[0];
      }
      console.log('===========================');
      console.log('Nodes are ', nodes);
      console.log('Dist ', dist);
      console.log('Prev', prev);

      // get next node based on shortest edge that obeys the elevation rule
      const shortestEdge = this.getShortestEdge(currentNode, currentDirection);
      console.log('Shortest edge ', shortestEdge);
      const nextNode = shortestEdge.node;

      console.log('Current node', currentNode);
      console.log('Next node', nextNode);

      // update elevation direction
      if (nextNode.elevation < currentNode.elevation) {
        nextDirection = 'down';
      } else {
        nextDirection = 'up';
      }
      // update distance to the next node
      const updated = this.updateDistance(dist, prev, currentNode, nextNode, shortestEdge, currentDirection);
      // remove current from nodes to be visited
      nodes = nodes.filter(node => node !== currentNode);
      console.log('Filtered nodes', nodes);

      // update current
      currentNode = nextNode;

      if (updated) {
        this.edges[currentNode.name].forEach(edge => {
          this.updateDistance(dist, prev, currentNode, edge.node, edge, currentDirection);
        });
      }
    }
    console.log('Dists are ', dist);
    console.log('Prev is ', prev);
  }

  updateDistance(dist, prev, currentNode, nextNode, edge, currentDirection) {
    // when called with current node being initial source node, the dist value will be null so we have the circuit or
    const newDistance = (dist[currentDirection][currentNode.name] || 0) + edge.weight;
    const nextDirection = nextNode.elevation >= currentNode.elevation ? 'up' : 'down';
    if ((dist[nextDirection][nextNode.name] || Infinity) > newDistance) {
      dist[nextDirection][nextNode.name] = newDistance;
      prev[nextDirection][nextNode.name] = currentNode;
      return true;
    }
    return false;
  }
}

module.exports = { Node, Graph };
