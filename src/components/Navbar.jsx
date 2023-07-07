import { AppBar, Box, Button, IconButton, Modal, styled, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StyledToolbar= styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    height:"95px"
  });
 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'gray',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

 

const Navbar = () => {  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    axios.post('https://localhost:7075/api/Users/SignOut',)
      .then(response => {
        document.cookie = 'cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();

        setOpen(false)
        navigate('/home');
        window.location.reload(); 
      })
      .catch(error => {
      });
  };

  useEffect(() => {
    console.log(isLoggedIn);
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);      
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  return (
    <AppBar position='sticky'>
        <StyledToolbar sx={{bgcolor:"#8b4726", display:"flex"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
         
          </IconButton>
          <Link to="home" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"#fff"  }}>
            Ana Sayfa
          </Typography>
        </Link>
        




        <Link to="survey-answer" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"#fff"  }}>
            Anketler
          </Typography>
        </Link>

      

          {
            isLoggedIn?(
              <>

                  <Link to="survey" style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"#fff"  }}>
                      Anket Oluştur
                    </Typography>
                  </Link>

              

                <Button onClick={handleOpen} sx={{color:"white"}}>Çıkış</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                 
                    <Button
                    onClick={handleLogout}
                    sx={{ flexGrow: 1,color:"#fff", backgroundColor:"#8b4726" }}>
                      Çıkış Yap
                    </Button>
                  
                  </Box>
                </Modal> 
              </>
            ):
            
            
            (
              <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"#fff"  }}>
                Giriş
              </Typography>
              </Link>  
            )
          }      
        </StyledToolbar>
    </AppBar>
  )
}

export default Navbar