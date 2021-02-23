const sum = (n) => {
    return [...Array(n + 1).keys()].reduce((acc, cur) => acc + cur, 0)
};
console.log(sum(10));
