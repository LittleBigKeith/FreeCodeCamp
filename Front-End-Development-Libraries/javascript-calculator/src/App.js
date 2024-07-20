import './App.css';
import { Button, Box, Grid, Typography } from '@mui/material'
import { useState } from 'react';



const App = () => {

  const [currentNumber, setCurrentNumber] = useState("0")
  const [expression, setExpression] = useState("")

  const reset = () => {
    setCurrentNumber("0");
    setExpression("");
  };

  const numberInput = (event) => {
    console.log(expression)
    if (event.target.value === "." && currentNumber.includes(".")) {
      return;
    }
    const newInput = currentNumber === "0" && event.target.value !== "." ? event.target.value : currentNumber + event.target.value
    setCurrentNumber(newInput);
    setExpression(prev => prev ? prev.substring(0, prev.length) + event.target.value : prev + newInput)
  }

  const operatorInput = (event) => {
    if (currentNumber === "-") {
      setCurrentNumber("");
      setExpression(prev => prev.substring(0, prev.length - 2) + event.target.value);
      return;
    } 
    if (expression.match(/[+\-*/]$/)) {
      if (event.target.value !== "-") {
        setExpression(prev => prev.substring(0, prev.length - 1) + event.target.value);
        setCurrentNumber("");
      } else {
        setExpression(prev => prev + "-");
        setCurrentNumber("-");
      }
    } else {
      setExpression(prev => prev + event.target.value);
      setCurrentNumber("");
    }
  }

  const evaluate = () => {
    let result = NaN;
    try {
      result = eval(expression);
    } catch (error) {
      console.log(`error: ${error}`);
      setCurrentNumber(NaN.toString());
      setExpression(NaN.toString());
      return;
    }
    
    const isInt = result === Math.round(result);
    setCurrentNumber(isInt ? result.toString() : result.toFixed(5).replace(/0+$/, ""));
    setExpression(prev => isInt? result.toString() : result.toFixed(5).replace(/0+$/, ""));
  }

  const buttons = [
    { id: "clear", name: "AC", type: "power", width: 9, onClick: reset },
    { id: "divide", name: "/", type: "operator", width: 3, onClick: operatorInput},
    { id: "seven", name: "7", type: "number", width: 3, onClick: numberInput},
    { id: "eight", name: "8", type: "number", width: 3, onClick: numberInput},
    { id: "nine", name: "9", type: "number", width: 3, onClick: numberInput},
    { id: "multiply", name: "*", type: "operator", width: 3, onClick: operatorInput},
    { id: "four", name: "4", type: "number", width: 3, onClick: numberInput},
    { id: "five", name: "5", type: "number", width: 3, onClick: numberInput},
    { id: "six", name: "6", type: "number", width: 3, onClick: numberInput},
    { id: "subtract", name: "-", type: "operator", width: 3, onClick: operatorInput},
    { id: "one", name: "1", type: "number", width: 3, onClick: numberInput},
    { id: "two", name: "2", type: "number", width: 3, onClick: numberInput},
    { id: "three", name: "3", type: "number", width: 3, onClick: numberInput},
    { id: "add", name: "+", type: "operator", width: 3, onClick: operatorInput},
    { id: "zero", name: "0", type: "number", width: 6, onClick: numberInput},
    { id: "decimal", name: ".", type: "number", width: 3, onClick: numberInput},
    { id: "equals", name: "=", type: "execute", width: 3, onClick: evaluate},
  ]

  return (
    <div className="App">
      <header className="App-header">
        <Box className="calculator">
          <Box textAlign="right" padding="1rem" overflow="hidden">
            <Typography id="formula" variant="h5" minHeight="1.4em">{expression}</Typography>
            <Typography id="display" variant="h3">{currentNumber}</Typography>
          </Box>
          <Grid className="calculatorButtons" container spacing={0.1}>
              { buttons.map(button =>
                  <Grid item id={`grid-${button.name}`} key={`button-${button.name}`} xs={button.width}>
                    <Button id={button.id} className={button.type} value={button.name} onClick={button.onClick} sx={{ height: "55px", width: "100%" }}>{button.name}</Button>
                  </Grid>
              )}
          </Grid>
        </Box>
      </header>
    </div>
  );
};

export default App;
