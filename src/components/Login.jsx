import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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

const Login = () => {
   
  const [userNameOrEmail, setuserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      
        navigate('/home');  
        window.location.reload();    
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
                placeholder="Kullanıcı Adı"
                value={userNameOrEmail}
                onChange={(e) => setuserNameOrEmail(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
            <input
                type="password"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
           
           <button type="submit" 
           style={{ padding: '5px 10px', backgroundColor:"#8b8b83", borderColor:"#8b8b83", borderRadius:"5px" }}>
            Giriş Yap
            </button>       
           
                
            </form>
    </StyledCard>
    
  );
};

export default Login;
