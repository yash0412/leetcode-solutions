"use strict";
class UnionFind {
    constructor(size) {
        // Initialize the parent array with each
        // element as its own representative
        this.parent = Array.from({ length: size }, (_, i) => i);
    }
    find(i) {
        // If i itself is root or representative
        if (this.parent[i] === i) {
            return i;
        }
        // Else recursively find the representative
        // of the parent
        return this.find(this.parent[i]);
    }
    unite(i, j) {
        // Representative of set containing i
        const irep = this.find(i);
        // Representative of set containing j
        const jrep = this.find(j);
        // Make the representative of i's set
        // be the representative of j's set
        this.parent[irep] = jrep;
    }
}
function countCompleteComponents(n, edges) {
    const unionFind = new UnionFind(n);
    const edgeMap = edges.reduce((acc, curr) => {
        const [s, d] = curr;
        if (!acc[s]) {
            acc[s] = new Set();
        }
        acc[s].add(d);
        if (!acc[d]) {
            acc[d] = new Set();
        }
        acc[d].add(s);
        return acc;
    }, {});
    const componentParents = {};
    edges.forEach((edge) => {
        const [s, d] = edge;
        const sParent = unionFind.find(s);
        unionFind.unite(s, d);
        const parent = unionFind.find(s);
        if (!componentParents[parent]) {
            componentParents[parent] = {
                items: new Set([s, d]),
                isConnected: true,
            };
        }
        else {
            componentParents[parent].items.add(s);
            componentParents[parent].items.add(d);
        }
        if (componentParents[sParent]) {
            componentParents[sParent].items.forEach((item) => {
                componentParents[parent].items.add(item);
            });
            if (!componentParents[sParent].isConnected) {
                componentParents[parent].isConnected = false;
            }
        }
        if (componentParents[parent].isConnected) {
            componentParents[parent].isConnected = Array.from(componentParents[parent].items).every((s) => {
                return Array.from(componentParents[parent].items).every((d) => {
                    return s === d || (edgeMap[s] && edgeMap[s].has(d)) ? true : false;
                });
            });
        }
    });
    const uniqueSets = new Set();
    for (let i = 0; i < n; i++) {
        const parent = unionFind.find(i);
        if (!componentParents[parent] || componentParents[parent].isConnected)
            uniqueSets.add(parent);
    }
    return uniqueSets.size;
}
