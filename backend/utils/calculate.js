const calcNoOfIntegers = (numbersArr) => {
  return numbersArr.length;
};

const calcMean = (numbersArr, dp = 3) => {
  const total = numbersArr.reduce((total, amount) => {
    return total + amount;
  });
  const mean = total / numbersArr.length;
  return mean.toFixed(dp);
};

/**Hashmap starts as an empty object and for each number in the array,
 *  we will check if this number is already in the object, if not a
 * key-value pair will be added to the object e.g. {"137": 1} and if
 * already in the object the value of that key will be increased by 1.
 * Hashmap will look like this { '186': 1, '437': 2, '-616': 1 }*/
const generateHashMap = (numbersArr) => {
  return numbersArr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
};

/** Finds the most common integer in an array of numbers passed in.
 *  If arrayOfValues is specified as true, the function will return
 *  an array of the most common integer(s). There will only be more
 *  than one if there are more than one integer with an equally high
 *  number of occurrences. e.g. "3" occured 5 times and "8" also
 *  occured 5 times and no other integer occured more than 5 times.
 */
const findMostCommon = (numbersArr, arrayOfValues = false) => {
  const hashmap = generateHashMap(numbersArr);
  const mostCommonKey = Object.keys(hashmap).reduce((a, b) => {
    return hashmap[a] > hashmap[b] ? a : b;
  });
  if (arrayOfValues === false) {
    return mostCommonKey;
  } else {
    const mostCommonValueArr = Object.keys(hashmap).filter((x) => {
      if (hashmap[x] === hashmap[mostCommonKey]) {
        return x;
      }
    });
    return mostCommonValueArr;
  }
};

/** Finds the integer with the highest occurance in the array and
 * reads it's value in the hashmap that contains the number of times
 * in the array that it occured
 */
const findHighestOccurrence = (numbersArr) => {
  const hashmap = generateHashMap(numbersArr);
  const mostCommonKey = Object.keys(hashmap).reduce((a, b) => {
    return hashmap[a] > hashmap[b] ? a : b;
  });
  return hashmap[mostCommonKey];
};

const findHighest = (numbersArr) => {
  return Math.max(...numbersArr);
};

const findLowest = (numbersArr) => {
  return Math.min(...numbersArr);
};

export {
  calcNoOfIntegers,
  calcMean,
  findMostCommon,
  findHighestOccurrence,
  findLowest,
  findHighest,
};
