function treeSum(node)
{
    var sum = node.num;

    if (node.left != null)
        sum += treeSum(node.left);
    if (node.right != null)
        sum += treeSum(node.right);

    return sum;
}