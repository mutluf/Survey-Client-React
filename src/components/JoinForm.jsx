import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  width: 20%;
  min-height: 200px;
  margin: 20px;
  padding: 20px;
  background-color: #eed5b7;
  display:flex;
  align-items:center;
  justify-content:center;

  &:hover {
    background-color: #eed5b7;
  }
`;

const JoinForm = () => {
   
  const [userNameOrEmail, setuserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Cookie'ye set yapmak için
  function setCookie(name, value, expirationDays) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = name + "=" + cookieValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7075/api/Users/Login', {
        userNameOrEmail,
        password
      },{
        withCredentials: true // Cookie'leri almak için ekstra seçenek
      });

      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken.accesssToken));
      localStorage.setItem('id', JSON.stringify(response.data.id));
      console.log('Giriş başarılı!', response.data);

    } catch (error) {
      // Giriş hatalı durumunda yapılacak işlemler
      console.error('Giriş hatası:', error);
    }    
  };



  return (
    <StyledCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Adınız"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
            <input
                type="text"
                placeholder="Soyadınız"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
            <input
                type="text"
                placeholder="Yaşınız"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />


           <br/>
            <Grid container spacing={2} >
              <Grid xs={4} sx={{marginTop:"15px"}}>
              <label style={{fontSize:"14px"}}>Cinsiyetiniz:</label>
              </Grid>

              <Grid item xs={4}>
              <input
              type="radio"
              id="erkek"
              name="cinsiyet"
              value="erkek"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="erkek">Erkek</label>

            
              </Grid>
              <Grid item xs={4}>
              <input
              type="radio"
              id="kadın"
              name="cinsiyet"
              value="kadın"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="kadın">Kadın</label>
              </Grid>
            </Grid>
           
           
           
           <br/>
           <button type="submit" 
           style={{ padding: '5px 10px', backgroundColor:"#8b8b83", borderColor:"#8b8b83", borderRadius:"5px" }}>
            Devam et
            </button>       
           
                
            </form>
    </StyledCard>
    
  );
};

export default JoinForm;
