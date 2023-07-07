import styled from '@emotion/styled';
import { Card, CardMedia, List, ListItem, ListItemText,Button as MuiButton } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  width: 50%;
  min-height: 700px;
  margin: 20px;
  padding: 20px;
  background-color: #eed5b7;

  &:hover {
    background-color: #eed5b7;
  }
`;

const StyledButton = styled(MuiButton)`
  &.MuiButton-containedPrimary {
    size: small;
    background-color: #8b8989;
    color: #ffffff;
  }

  &.MuiButton-containedPrimary:hover {
    background-color: #8b8989;
  }

  &.MuiButton-containedSecondary {
    background-color: #8b4726;
    color: #ffffff;
  }

  &.MuiButton-containedSecondary:hover {
    background-color: #8b4726;
  }
`;
const SurveyList = () => {
  return (
    <StyledCard>
        <List component="nav">
            <Card>
            <ListItem >
          <Link to="/survey-answer/12" style={{ textDecoration:'none', fontSize:"1rem", fontWeight:"bold"}}>
            Sanat
          
          <CardMedia
        component="img"
        height="200"
        sx={{ width: 600, marginLeft:"20px" }}
        image="https://sanatakademi.com.tr/uploads/2023/01/sanat-724x394.webp"
        alt="Paella dish"
      />
      </Link>
        </ListItem>
            </Card>
        
        <br/>
        <Card>
            <ListItem >
          <Link to="/survey-answer/13" style={{ textDecoration:'none', fontSize:"1rem", fontWeight:"bold"}}>
          Felsefe
         
          <CardMedia
        component="img"
        height="194"
        sx={{ width: 600, marginLeft:"15px" }}
        image="https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/09/philosophy@uwinnipeg.jpg"
        alt="Paella dish"
      />
       </Link>
        </ListItem>
            </Card>
     
        
      </List>
    </StyledCard>
  )
}

export default SurveyList
