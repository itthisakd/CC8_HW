const findAnswer = (n) => {
    let initialArrOfDigits = String(n)
      .split("")
      .map((digit) => Number(digit));
    let initialSumOfDigits = initialArrOfDigits.reduce((acc, cur) => acc + cur, 0);

    let double = initialSumOfDigits * 2;

    let sumOfDigits = 0;
    while (sumOfDigits < double) {
      arrOfDigits = String(n)
        .split("")
        .map((digit) => Number(digit));

      sumOfDigits = arrOfDigits.reduce((acc, cur) => acc + cur, 0);
      n++;
    }
    return n-1
}

console.log(findAnswer(99))