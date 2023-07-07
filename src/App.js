
import './App.css';
import Navbar from '../src/components/Navbar';
import Feed from '../src/components/Feed';
import { Box, Stack } from '@mui/material';

function App() {
  return (
    <Box sx={{marginTop:-5}}>
    <Navbar/>
    <br></br>
    <Stack bgcolor="#fdf5e6" direction="row" spacing={2}  >
      <Feed/>
    </Stack>
  </Box>
  );
}

export default App;
