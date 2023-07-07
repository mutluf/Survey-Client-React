import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Radio, FormControlLabel, FormControl, RadioGroup, TextField, Grid, Checkbox, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#bcee68' : '#308fe8',
  },
}));



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
const Result = () => {
  const [result, setResult] = useState(null);
  const { id } = useParams();

  

  useEffect(() => {
    axios
      .get(`https://localhost:7075/api/Surveys/${id}/result`, {
        withCredentials: true
      })
      .then(response => {
        setResult(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  if (!result) {
    return <div>Loading...</div>;
  }

  
  let data = []
  let datas = []

  result.questions.map((question,index)=>{
    if(question.questionType=="Single"){

      question.options.map(option=>{
        option.answeredOptions.map(opt=>{
          [1,2,3,4,5,6,7,8,9,10].map(values=>{
            
           
              if(opt.optionContent== values){
                if(data.filter((element) => element.name == values).length==0){
                  data.push(
                    { name: values, 
                    value: 1
                  })                
                }
                else{
                  const index = data.findIndex((element) => element.name == values);
                  data[index].value += 1;
                }
            }
          })
        })
      })
    } 
    if(question.questionType=="Multiple"){

      question.options.map((option)=>{
        
           datas.push( { 
            label: option.optionContent, 
            value: option.answeredOptions.length,
            index:index
          })
      
      })
    } 
      
  });

  const COLORS = ['#FFCC99', '#ffe1ff', '#8b3a3a','#ffb6c1', '#ff8c00', '#eeee00',
  '#c0ff3e', '#7fffd4', '#8470ff','#ff6a6a', '#b0c4de', '#1e90ff','#8b3a3a'];
  
 
  
  return (
    <StyledCard>
      <CardContent>
        {result && (
          <>
            {result.title && (
              <Grid container spacing={0}>
               <Grid item xs={8}>
               <Typography variant="h3" component="h3" sx={{ color: "#8b7765" }}>
                {result.title}              
              </Typography>

               </Grid>
               <Grid item xs={4}>
               <Typography variant="h6" component="h6" sx={{ color: "#8b7765" }}> 
               Katılım sayısı: {result.responseCount}
               </Typography>
                </Grid>                           
              </Grid>
             
            )}
            {result.description && (
          <>
          
            <br/>
              <Typography variant="subtitle1" sx={{backgroundColor:"#fdf5e6", padding:"10px", borderRadius:"5px"}} >
                {result.description}</Typography>
            <br/>
          </>             
            )}
            {result.questions && (
              <>
                {result.questions.map((question, questionIndex) => (
                  <Card key={questionIndex} style={{ marginBottom: '10px' }}>
                    <CardContent>
                      <Typography variant="body1" component="h5" sx={{color:"green", fontWeight:12}}>
                        Soru {questionIndex + 1}
                      </Typography>
                      <br />
                      <Typography variant="body1">{question.questionContent}</Typography>
                      <br />
                      <FormControl fullWidth>
                      
                      {question.questionType === 'Text' ? (                        
                          <Typography></Typography>
                        ):(
                          question.questionType === 'Single' ? (    
                          
                           <PieChart width={350} height={230}>
                              <Pie
                                data={data}
                                cx={250}
                                cy={80}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                                             
                            
                        ) : (
                          question.questionType === 'Multiple'?(
                        
                            <BarChart width={600} height={400} data={datas}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#ffb6c1"/>
                            
                          </BarChart>
                        
                          ):(
                            
                            question.questionType === 'Progress'?(
                              question.options.map((choice, index) => (
                                <div key={index}>  
                                      <FormControl fullWidth margin="normal">                                        
                                          <Grid container spacing={0}>
                                            <Grid item xs={0.7}>
                                            <Typography size='small' sx={{ backgroundColor: "white", width:"80%", marginTop:"8px"}}                                   
                                            >{choice.optionContent}                                                                       
                                        </Typography>
                                            </Grid>
                                            <Grid item xs={11.3}>
                                            <RadioGroup
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          defaultValue={0}
                                          name="radio-buttons-group"
                                        >
                                          <FormControlLabel 
                                          key={index}
                                          value={choice.id} 
                                          disabled
                                          control={<Radio
                                          color='default' />}  />                                         
                                        </RadioGroup>
                                            </Grid> 
                                          </Grid>
                                          <BorderLinearProgress variant="determinate"
                                          label="Value" 
                                          value={choice.answeredOptions.length}>  
                                          </BorderLinearProgress>                                         
                                      </FormControl>                      
                                  <br />
                                  <br />
                                </div>
                              )
                            )                            
                            ):(
                              <>                             
                             {question.options.map((choice) => (
<>
                                  <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                    <Typography>
                                    {choice.optionContent}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                <BorderLinearProgress variant="determinate"
                                  label="Value" 
                                  value={choice.answeredOptions.length}> 
                                </BorderLinearProgress> 
                                <br/> 
                                </Grid>
                                
                                <Grid item xs={1}>
                                <Typography>
                                {choice.answeredOptions.length}
                                </Typography>
                                </Grid>
                                  </Grid>  
                                                                       
                                  </>
                            ))}
                              </>
                            )
                          )
                        ))}
                      </FormControl>
                    </CardContent>
                  </Card>
                ))}
              </>             
            )}
          </>
        )}
        {!result && <Typography variant="body1">Sonuçlar yükleniyor...</Typography>}
      </CardContent>
    </StyledCard>
  );
};

export default Result;
