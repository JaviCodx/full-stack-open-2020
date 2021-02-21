
interface ReturnedStats {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;

}

interface CommandLineData {
    dataArray: Array<number>;
  }

  export const parseArgs = (args: Array<string>): CommandLineData => {

    if (args.length < 4) throw new Error('Not enough arguments');

    let _script;
    let _path;
    let dataArray;

    [_script, _path,... dataArray] = args;

    dataArray = dataArray.map(d=>Number(d))

    dataArray.forEach(d=>{
        if(isNaN(d))
        throw new Error("Some provided values were not numbers!");
        
    })
    return {dataArray}
 
}

export const exerciseCalculator = (array: Array<number>): ReturnedStats => {

    let target;
    let daysArray;
    
    [target, ...daysArray] = array;

    const periodLength = daysArray.length;
    const trainingDays = daysArray.filter(d=>d != 0).length
    const average = daysArray.reduce((acc, curr) => acc + curr)/periodLength
    const success = average >= target;

    let rating;
    let ratingDescription;

    if(average > target) {
        rating = 3;
        ratingDescription = "Good work, keep it up!"
    } else if (average == target) {
        rating = 2
        ratingDescription ="You fullfilled your goals"
    }  else {
        rating = 1
        ratingDescription ="Not too bad but could be better"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}


try {
    const { dataArray } = parseArgs(process.argv);
    console.log(exerciseCalculator(dataArray));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }

