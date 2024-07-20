import './App.css';
import Generator from './Generator';
import { AppBar, Box, Typography } from '@mui/material';

const App = () => {
  return (
    <Box className="App">
      <AppBar sx={{background: "linear-gradient(black, #888888)", boxShadow: "0 0 20px 2px"}} className="App-header">
        <Typography variant='h4'>Random Quote Machine</Typography>
      </AppBar>
      <Generator />
    </Box>
  );
}

export default App;
