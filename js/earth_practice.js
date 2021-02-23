// Given an integer 'n', return the smallest integer greater than n and the sum of digit of whose is twice as big as the sum of digits of n
// For example, n = 14. The function should return 19 as the sum of digits of 19 (1+9=10) is x2 of the sum of digits of n = 14 (1+4=5)

const findAnswer = (n) => {
  let initialSumOfDigits = findSum(n);
  let double = initialSumOfDigits * 2;

  do {
    sumOfDigits = findSum(n);
    n++;
  } while (sumOfDigits != double);
  return n - 1;
};

console.log(findAnswer(99)); //9999
console.log(findAnswer(10)); //11
console.log(findAnswer(20)); //39
console.log(findAnswer(202)); //299
console.log(findAnswer(29)); //22
console.log(findAnswer(90)); //499

// create function that takes input of type number n and returns sum of the digits in n
//     convert num to string, split string, reduce to find sum while converting each cur to num
const findSum = (n) =>
  [...String(n)].reduce((acc, cur) => acc + Number(cur), 0);

const findAnswer = (n) => {
  // use fn find sum
  let initialSumOfDigits = findSum(n);
  // find double of the digits of input
  let double = initialSumOfDigits * 2;

  // add to n and loop to find sum of digits and compare to double
  while (true) {
    // use function find sum
    sumOfDigits = findSum(n);
    // chcek if true, if yes: break and return n
    if (sumOfDigits == double) {
      break;
    } else {
      // if not true, n++ and loop through to find sum again
      n++;
    }
  }
  return n;
};
