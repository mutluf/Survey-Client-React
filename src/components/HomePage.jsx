import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#D2B48C', // Kahverengi krem tonu
    color: '#FFF',
    with:'100%'
  },
  title: {
    marginBottom: '16px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: '32px',
  },
  button: {
    backgroundColor: '#8b7765', // Kahverengi tonu
    color: '#FFF',
    marginTop: '16px',
    '&:hover': {
      backgroundColor: '#8b8989', // gri
    },
  },
};

const HomePage = () => {
  return (

     <div style={styles.root}>
      <Typography variant="h4" style={styles.title}>
        Anket Uygulaması
      </Typography>
      <Typography variant="subtitle1" style={styles.subtitle}>
        Hoş geldiniz! Anketlere katılarak görüşlerinizi paylaşabilirsiniz.
      </Typography>
      <Link to="/surveyAnswer">
      <Button variant="contained" style={styles.button}>
        Anketlere Git
      </Button>
      </Link>
      
    </div>

   
  );
};

export default HomePage;
