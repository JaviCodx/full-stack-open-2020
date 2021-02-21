import express from 'express';
import {calculateBmi, parseArguments} from "./bmiCalculator"
const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {

    try {
        const {height, weight}= parseArguments([req.query.height,req.query.weight])
        const bmi = calculateBmi(height, weight)
       
        res.status(200).json({height, weight, bmi })
      } catch (e) {
     
        res.status(400).json({error: e.message})
      }

  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});