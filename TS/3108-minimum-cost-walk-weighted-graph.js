"use strict";
function minimumCost(n, edges, query) {
    const minCosts = [];
    const edgeMap = {};
    edges.forEach((edge) => {
        const [s, d, c] = edge;
        if (!edgeMap[s]) {
            edgeMap[s] = {};
        }
        if (!edgeMap[s][d]) {
            edgeMap[s][d] = [];
        }
        edgeMap[s][d].push(c);
        if (!edgeMap[d]) {
            edgeMap[d] = {};
        }
        if (!edgeMap[d][s]) {
            edgeMap[d][s] = [];
        }
        edgeMap[d][s].push(c);
    });
    query.forEach((q) => {
        minCosts.push(minCostWalk(edgeMap, q));
    });
    return minCosts;
}
function minCostWalk(edgeMap, query) {
    const [source, destination] = query;
    let minCost = -1;
    if (!edgeMap[source]) {
        return minCost;
    }
    const elemQueue = [];
    Object.keys(edgeMap[source]).forEach((destinationStr) => {
        const dest = parseInt(destinationStr);
        edgeMap[source][dest].forEach((cost) => {
            elemQueue.push({ vertice: dest, cost: cost });
        });
    });
    console.log(elemQueue);
    let queueIndex = 0;
    while (queueIndex < elemQueue.length) {
        const elem = elemQueue[queueIndex];
        queueIndex++;
        if (elem.vertice === destination && elem.cost === 0) {
            return elem.cost;
        }
        Object.keys(edgeMap[elem.vertice]).forEach((destinationStr) => {
            const dest = parseInt(destinationStr);
            edgeMap[elem.vertice][dest].forEach((cost) => {
                if ((elem.vertice === destination && (elem.cost & cost) < elem.cost) ||
                    elem.vertice !== destination)
                    elemQueue.push({ vertice: dest, cost: elem.cost & cost });
            });
        });
        console.log(elemQueue, elem);
        if (queueIndex > 2) {
            break;
        }
    }
    return minCost;
}
console.log(minimumCost(5, [
    [0, 1, 7],
    [1, 3, 7],
    [1, 2, 1],
], [[0, 3]]));
