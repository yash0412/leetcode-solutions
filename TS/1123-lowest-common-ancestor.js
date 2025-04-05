"use strict";
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
function lcaDeepestLeaves(root) {
    let maxDepth = -1;
    let lca = null;
    const dfs = (n, d) => {
        const dleft = (n === null || n === void 0 ? void 0 : n.left) ? dfs(n.left, d + 1) : d;
        const dright = (n === null || n === void 0 ? void 0 : n.right) ? dfs(n.right, d + 1) : d;
        if (d > maxDepth)
            maxDepth = d;
        if (dleft === maxDepth && dright === maxDepth)
            lca = n;
        return Math.max(dleft, dright);
    };
    dfs(root, 0);
    return lca;
}
