import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button as MuiButton, Radio, FormControlLabel, FormControl, RadioGroup, TextField, Grid, Checkbox, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

const AnswerSurvey = () => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const opts=[];
  let optioniid=0;
  const [surveyid, setSurveyid]=useState(0);


  useEffect(() => {
    axios
      .get(`https://localhost:7075/api/Surveys/${id}`, {
        withCredentials: true
      })
      .then(response => {
        setSurvey(response.data.survey);
        setSurveyid(response.data.survey.id)
        console.log(response.data.survey)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const link = `http://localhost:3000/survey/${surveyid}/result`;

  const [checkedOptions, setCheckedOptions] = useState({});

  const handleCheckboxOptionChange = (event, optionId, questionIndex) => {
    const isChecked = event.target.checked;
  
    setCheckedOptions(prevOptions => ({
      ...prevOptions,
      [optionId]: isChecked,
    }));
  
    setAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers };
  
    if (isChecked) {
      updatedAnswers[questionIndex] = optionId;
    } else {
      delete updatedAnswers[questionIndex];
    }
  console.log(updatedAnswers)
    return updatedAnswers;
    });
  };
  

  const handleOptionChange = (questionIndex, value) => {

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleTextChange = (questionIndex, value) => {

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSingleOptionChange = (questionIndex, value) => {

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleProgressBarChange = (e, questionIndex, choiceIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options[choiceIndex].OptionContent = e.target.value;
    setSurvey({ ...survey, Questions: updatedQuestions });
  };
  const handleSurveySubmit = () => {
    const response = {     
      id: 0,
      surveyId: survey.id,
      userId: localStorage.getItem('id') ,
      questions: []    
    };
  
    survey.questions.forEach((question, questionIndex) => {
      const answeredQuestion = {
        id:0,
        questionId: question.id,
        questionContent:question.questionContent,
        questionRate:0,
        responseId: 0,
        options: [
         
        ],
        questionType: question.questionType
      };
      
      if(question.questionType=="Single"){
        if (answers.hasOwnProperty(questionIndex)) {
          opts.forEach((option)=>{
            const optionId = option;
            const optionContent = answers[questionIndex]
            

            const answeredOption = {
            id: 0,
            optionId,
            optionContent,
            QuestionId: question.id,
            votes:[{
              optionId: optionId,
              answeredOptionId: 0,
            }]
          };
         
          answeredQuestion.options.push(answeredOption);
          })         
        }
      }
      else if(question.questionType=="Text"){
        if (answers.hasOwnProperty(questionIndex)) 
        {                     
          const optionContent = answers[questionIndex]
          question.options.map((option)=>
          {
            const answeredOption = {
              id: 0,
              optionId:option.id,
              optionContent,
              QuestionId: question.id,
              votes:[{
                optionId: option.id,
                answeredOptionId: 0,
              }]
            };
            answeredQuestion.options.push(answeredOption);
          })  
        }
      }
      else if(question.questionType=="Multiple"){
        if (answers.hasOwnProperty(questionIndex)) {
          const optionId = answers[questionIndex];

          
          question.options.map((option)=>
          {
            

            if(optionId==option.id){
              
              const answeredOption = {
                id: 0,
                optionId:optionId,
                optionContent:option.optionContent,
                QuestionId: question.id,
                votes:[{
                  optionId: optionId,
                  answeredOptionId: 0,
                }]
              };
              
              answeredQuestion.options.push(answeredOption);
            }
          
          })  
        }
      } 
      else if (question.questionType=="Progress"){
        if (answers.hasOwnProperty(questionIndex)) {
          const optionId = answers[questionIndex];
          question.options.map((option)=>
          {
            console.log(option)
            if(option.id==optionId){
              const answeredOption = {
                id: 0,
                optionId:optionId,
                optionContent:option.optionContent,
                QuestionId: question.id,
                votes:[{
                  optionId: optionId,
                  answeredOptionId: 0,
                }]
              };
              answeredQuestion.options.push(answeredOption);
            }
           
          })  
        }
      } 
      
      else{

        console.log(questionIndex,answers)
        if (answers!=null) {

          question.options.map((option,index)=>
          {
            const optionId = answers[index];
            console.log(option)
            if(optionId== option.id){
              const answeredOption = {
                id: 0,
                optionId,
                optionContent:option.optionContent,
                QuestionId: question.id,
                votes:[{
                  optionId: optionId,
              answeredOptionId: 0,
                }]
              };
              answeredQuestion.options.push(answeredOption);
            
            }              
           
          })  
        }
      }     
      response.questions.push(answeredQuestion);
    });

    axios    
      .post('https://localhost:7075/api/Responses', { response }, { headers: { 'Content-Type': 'application/json', 'withCredentials': true }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <StyledCard>
      <CardContent>
        {survey && (
          <>
            {survey.title && (
              <Typography variant="h3" component="h3" sx={{ color: "#8b7765" }}>
                {survey.title}
              </Typography>
            )}
            {survey.description && (
          <>
            <br/>
              <Typography variant="subtitle1" sx={{backgroundColor:"#fdf5e6", padding:"10px", borderRadius:"5px"}} >
                {survey.description}</Typography>
            <br/>
          </>             
            )}
            {survey.questions && (
              <>
                {survey.questions.map((question, questionIndex,optionid) => (
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
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={answers[questionIndex] || ''}
                            onChange={(e) => handleTextChange(questionIndex, e.target.value)}
                            color='warning'
                          />
                        ):(
                          question.questionType === 'Single' ? (                         
                            <RadioGroup
                              row
                              aria-labelledby={`question-${questionIndex}`}
                              value={answers[questionIndex] || ''}
                              onChange={(e) => handleSingleOptionChange(questionIndex,e.target.value)}                                                        
                            >

                           {question.options.forEach((option)=>{
                             optioniid=option.id
                             opts.push(optioniid);
                           })                                                         
                           }
                           {console.log("optionid:" +optionid)}
                           
                             <FormControlLabel                             
                               key={1}
                               value={1}
                               control={<Radio color="default" />}
                               label={1}
                              
                             />
                             

                               <FormControlLabel 
                               key={2}
                               value={2}
                               control={<Radio color="default"/>}
                               label={2}

                             />
                               <FormControlLabel
                               key={3}
                               value={3}
                               control={<Radio color="default"/>}
                               label={3}
                               
                             />
                               <FormControlLabel
                               key={4}
                               value={4}
                               control={<Radio color="default"/>}
                               label={4}
                             />
                               <FormControlLabel
                               key={5}
                               value={5}
                               control={<Radio color="default"/>}
                               label={5}
                             />
                               <FormControlLabel
                               key={6}
                               value={6}
                               control={<Radio color="default"/>}
                               label={6}
                             />
                               <FormControlLabel
                               key={7}
                               value={7}
                               control={<Radio color="default"/>}
                               label={7}
                             />
                               <FormControlLabel
                               key={8}
                               value={8}
                               control={<Radio color="default"/>}
                               label={8}
                             />
                               <FormControlLabel
                               key={9}
                               value={9}
                               control={<Radio color="default"/>}
                               label={9}
                             />
                               <FormControlLabel
                               key={10}
                               value={10}
                               control={<Radio color="default"/>}
                               label={10}
                             />

                         </RadioGroup>
                        ) : (
                          question.questionType === 'Multiple'?(
                          <RadioGroup
                            aria-labelledby={`question-${questionIndex}`}
                            value={answers[questionIndex] || ''}
                           
                          >
                            {question.options.map((choice, choiceIndex) => (
                              <FormControlLabel
                                key={choiceIndex}
                                value={choice.id}
                                control={<Radio color="default" />}
                                label={choice.optionContent}
                                onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
                              />
                            ))}
                          </RadioGroup>
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
                                          onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
                                        >
                                          <FormControlLabel 
                                          key={index}
                                          value={choice.id} 
                                          control={<Radio 
                                          color='default' />}  />
                                          
                                        </RadioGroup>
                                            </Grid>
  
                                          </Grid>
                                          <BorderLinearProgress variant="determinate"
                                          label="Value" 
                                          value={2}
                                          onChange={(e) => handleProgressBarChange(e, questionIndex, index)}>
  
                                          </BorderLinearProgress>                                         
                                      </FormControl>                      
                                  <br />
                                  <br />
                                </div>
                              )
                            )
                            
                            ):(
                              <>
                             
                             {question.options.map((choice, choiceIndex) => (
                              <FormControl>
                                <FormGroup
                                
                                >
                                  <FormControlLabel 
                                    control={
                                      <Checkbox
                                        checked={checkedOptions[choice.id] || false}
                                        onChange={(e) => handleCheckboxOptionChange(e, e.target.value,choiceIndex)}
                                      />
                                    }
                                    label={choice.optionContent}
                                    value={choice.id}
                                  />
                                </FormGroup>
                              </FormControl>
                            ))}

                              </>
                            )
                          )
                        ))}
                      </FormControl>
                      {/* <BorderLinearProgress variant="buffer" value={50} /> */}
                    </CardContent>
                  </Card>
                ))}
                <StyledButton variant="contained" onClick={handleSurveySubmit}>
                  Anketi Gönder
                </StyledButton>


                <br/>                    
                <a href={link}>Sonuçlar</a>
              </>

             
            )}
          </>
        )}
        {!survey && <Typography variant="body1">Anket yükleniyor...</Typography>}
      </CardContent>
    </StyledCard>
  );
};

export default AnswerSurvey;