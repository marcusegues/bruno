const { Node, Graph } = require('./graph.js');

const graph = new Graph();

const node0 = new Node('0', 0);
const node1 = new Node('1', 10);
const node2 = new Node('2', 6);
const node3 = new Node('3', 5);
const node4 = new Node('4', 7);
const node5 = new Node('5', 11);
const node6 = new Node('6', 6);

graph.addNode(node0);
graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addNode(node5);
graph.addNode(node6);

graph.addDirectedEdge(node0, node1, 8);
graph.addDirectedEdge(node0, node2, 6);
graph.addDirectedEdge(node0, node3, 5);
graph.addDirectedEdge(node1, node4, 1);
graph.addDirectedEdge(node2, node4, 1);
graph.addDirectedEdge(node3, node4, 5);
graph.addDirectedEdge(node4, node5, 1);
graph.addDirectedEdge(node4, node6, 2);
graph.addDirectedEdge(node5, node0, 2);
graph.addDirectedEdge(node1, node0, 1);

graph.display();

graph.dijkstra(node0);
