import './App.css';
import React from 'react';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts'
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PropTypes from 'prop-types'

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          id: props.labels[1],
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          id: props.labels[0],
          children: <RemoveIcon fontSize="small" />,
        },
        input: {
          id: props.labels[2],
        }
      }}
      {...props}
      ref={ref}
    />
  );
});

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: auto;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;
  background-color: #dddddd;
  font-size: 18px;
  line-height: 1.5rem;
  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);   


const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          position: 'absolute',
          top: '116px',
          left: '126px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" id="timer-label">{props.labelText}</Typography>
        <Typography variant="h2" component="div" color="white" margin="auto auto">
        {props.time}
        </Typography>
        <Box id="button-box">
          <Button id="start_stop" onClick={props.countDown}>{props.isCountingDown ? <Pause /> : <PlayArrow />}</Button>
          <Button id="reset" onClick={props.reset}><RestartAltIcon /></Button>
        </Box>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const App = () => {
  const defaultSessionLength = 25;
  const defaultBreakLength = 5;
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [timeLeft, setTimeLeft] = useState(defaultSessionLength * 60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [labelText, setLabelText] = useState("Session");
  const formatTime = (time) => time.toLocaleString('en-US', {minimumIntegerDigits: 2})

  const reset = () => {
    setSessionLength(defaultSessionLength);
    setBreakLength(defaultBreakLength);
    setTimeLeft(defaultSessionLength * 60);
    setIsCountingDown(false);
    setIsBreak(false);
    setLabelText("Session");
    document.getElementById("beep").load()
  }

  const countDown = () => {
    setIsCountingDown(isCountingDown ? false : true);
  }

  useInterval(() => {
    if (timeLeft === 0) {
      setTimeLeft(isBreak ? sessionLength * 60 : breakLength * 60);
      setIsBreak(isBreak ? false : true);
      setLabelText(isBreak ? "Session" : "Break");
      document.getElementById("beep").play();
      return;
    }
    setTimeLeft((prevState) => prevState - 1);
  }, isCountingDown? 1000 : null);

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" id="session-label">Session Length</Typography>
        <NumberInput class="number-input" aria-label="Session Input" min={1} max={60} value={sessionLength} labels={["session-decrement", "session-increment", "session-length"]} onChange={(event, val) => {setSessionLength(val); setTimeLeft(val * 60)}} sx={{margin: '1rem 1rem 2rem 1rem'}}/>
        <Typography variant="h4" id="break-label">Break Length</Typography>
        <NumberInput class="number-input" aria-label="Break Input" min={1} max={60} value={breakLength} labels={["break-decrement", "break-increment", "break-length"]} onChange={(event, val) => setBreakLength(val)} sx={{margin: '1rem 1rem 4rem 1rem'}} />
        <CircularProgressWithLabel display="flex" size="400px" value={isBreak? timeLeft / 60 / breakLength * 100 : timeLeft / 60 / sessionLength * 100} labelText={labelText} time={`${formatTime(Math.floor(timeLeft / 60))}:${formatTime(timeLeft - Math.floor(timeLeft / 60) * 60)}`} countDown={countDown} reset={reset} isCountingDown={isCountingDown}/>
        <audio id="beep">
          <source src={`${process.env.PUBLIC_URL}/assets/ojousama.mp3`}></source>
        </audio>
      </header>
    </div>
  );
}

export default App;
