import chalk from 'chalk';

import {
  calcNoOfIntegers,
  calcMean,
  findHighestOccurrence,
  findMostCommon,
  findHighest,
  findLowest,
} from './calculate.js';

const genStatisticStatement = (numbersArr) => {
  return `There are ${chalk.green.bold.inverse(
    calcNoOfIntegers(numbersArr)
  )} integers with a mean of ${chalk.green.bold.inverse(
    calcMean(numbersArr, 3)
  )}, most common value(s) of ${chalk.green.bold.inverse(
    findMostCommon(numbersArr, true).join(' | ')
  )} which occured ${chalk.green.bold.inverse(
    findHighestOccurrence(numbersArr)
  )} time(s)`;
};

const generateStatisticArr = (numbersArr) => {
  return [
    calcNoOfIntegers(numbersArr),
    calcMean(numbersArr),
    findHighestOccurrence(numbersArr),
    findMostCommon(numbersArr),
    findHighest(numbersArr),
    findLowest(numbersArr),
  ];
};

const generateStatisticHeaders = () => {
  return 'Total Integers, Mean, Highest Occurrences, Most Common, Highest, Lowest \n';
};

export {
  genStatisticStatement,
  generateStatisticArr,
  generateStatisticHeaders,
};
