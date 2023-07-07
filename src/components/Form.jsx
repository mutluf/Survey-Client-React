import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';



const Form = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');



  return (
    <form >
      <FormControl >
        <TextField
          
          label="Adınız"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
         
          label="Soyadınız"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          
          label="Yaşınız"
          variant="outlined"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Cinsiyetiniz</FormLabel>
          <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="erkek" control={<Radio />} label="Erkek" />
            <FormControlLabel value="kadın" control={<Radio />} label="Kadın" />
          </RadioGroup>
        </FormControl>
        <Button
          
          variant="contained"
          color="primary"
          type="submit"
        >
          Gönder
        </Button>
      </FormControl>
    </form>
  );
};

export default Form;
