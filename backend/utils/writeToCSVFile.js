import fs from 'fs';
import chalk from 'chalk';

// Takes in a numbers array and returns the numbers in a csv formatted string
const convertToCSV = (headers, statisticsArr) => {
  const statistics = statisticsArr.join(',');
  return headers.concat(statistics);
};

// Takes in a numbers array + analytics data and outputs a csv file of the numbers and analysis
const writeReportToCSVFile = (headers, statisticsArr) => {
  const filename = 'dataReport.csv';
  fs.writeFile(filename, convertToCSV(headers, statisticsArr), (error) => {
    if (error) {
      console.log(`${chalk.red.bold(Error)} writing to csv file`, error);
    } else {
      console.log(
        `Report generated in the ${chalk.bold(
          '/csv-analytics'
        )} root directory with name: "${chalk.green.bold.underline(filename)}"`
      );
    }
  });
};

export { writeReportToCSVFile, convertToCSV };
