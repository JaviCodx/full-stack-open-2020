interface CommandLineValues {
    height: number;
    weight: number;
  }

export const parseArguments = (args: Array<unknown>): CommandLineValues => {

    
    if (args.length != 2 || !args[0] || !args[1]) throw new Error('Not enough/Too many parameters');

  
    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
      return {
        height: Number(args[0]),
        weight: Number(args[1])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export const calculateBmi = (height: number, weight:number): string => {


    const bmi = weight / Math.pow(height/100, 2);

    if (bmi < 15) return "Very severely underweight";
    else if (bmi >= 15 && bmi < 16 ) return "Severely underweight";
    else if (bmi >= 16 && bmi < 18.5 ) return "Underweight";
    else if (bmi >= 18.5 && bmi < 25 ) return "Normal (healthy weight)";
    else if (bmi >= 25 && bmi < 30) return "Overweight";
    else if (bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)";
    else if (bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)";
    else return "Obese Class III (Very severely obese)";

};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }