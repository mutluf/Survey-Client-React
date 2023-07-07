import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Card,
  CardContent,
  Button as MuiButton,
  Typography,
  Grid,
  InputBase,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

const Survey = () => {
  const [isCreated, setCreated]= useState(false)
  const [succesAlert, setSuccesAlert]= useState(false)
  const [survey, setSurvey] = useState({
    Description: '',
    Title: '',
    SolvedCount: 0,
    UserId: 1,
    Questions: [
      {
        QuestionContent: '',
        QuestionType: '',
        QuestionRate:0,
        Options: [
          {
            OptionContent: '',
            VoteAmount:0,
          },
        ],
      },
    ],
  });

  const [surveyid, setSurveyid]=useState(0);

  const handleSurveySubmit = () => {
    axios.defaults.withCredentials = true;
    axios
      .post('https://localhost:7075/api/Surveys', { Survey: survey }, { headers: { 'withCredentials': true } })
      .then((response) => {
        console.log(response.data);
        setSurveyid(response.data.id);
        setCreated(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      QuestionContent: '',
      QuestionType: 'Single',
      questionRate: 0,
      Options: [
        {
          OptionContent: '',
          VoteAmount:0,
        },
      ],
    };
    setSurvey({ ...survey, Questions: [...survey.Questions, newQuestion] });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions.splice(index, 1);
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[index].QuestionContent = e.target.value;
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const handleQuestionTypeChange = (e, index) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[index].QuestionType = e.target.value;
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const handleAddChoice = (questionIndex) => {
    
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options.push({
      OptionContent: '',
    });
    setSurvey({ ...survey, Questions: updatedQuestions });
  };


  const handleAddChoiceCheckbox = (questionIndex) => {
    
    const updatedQuestionsCheckbox = [...survey.Questions];
    updatedQuestionsCheckbox[questionIndex].Options.push({
      OptionContent: '',
    });
    setSurvey({ ...survey, Questions: updatedQuestionsCheckbox });
  };


  const handleChoiceChange = (e, questionIndex, choiceIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options[choiceIndex].OptionContent = e.target.value;
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const handleRemoveChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options.splice(choiceIndex, 1);
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // localStorage'dan oturum belirtecini kontrol et
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Oturum belirteci varsa kullanıcı oturum açmıştır
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [selectedColor, setSelectedColor] = useState('default');

  const link = `http://localhost:3000/survey-answer/${surveyid}`;

  const handleAddProgressBar = (questionIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options.push({
      OptionContent: '',
      
    });
    setSurvey({ ...survey, Questions: updatedQuestions })
  };

  const handleRemoveProgressBar = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options.splice(choiceIndex, 1);
    setSurvey({ ...survey, Questions: updatedQuestions });
  };

  const handleProgressBarChange = (e, questionIndex, choiceIndex) => {
    const updatedQuestions = [...survey.Questions];
    updatedQuestions[questionIndex].Options[choiceIndex].OptionContent = e.target.value;
    setSurvey({ ...survey, Questions: updatedQuestions });
  };


  return (
    <>
      {isLoggedIn ? (
        !isCreated ? (
        <StyledCard>
          <CardContent>
            <FormGroup>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ marginLeft: '30%', color: '#8b8989' }}
              >
                Anket Oluşturma
              </Typography>

              <FormControl>
                <TextField
                  label="Anket Başlığı"
                  value={survey.Title}
                  onChange={(e) => setSurvey({ ...survey, Title: e.target.value })}
                  sx={{ backgroundColor: '#fff', borderRadius: '5px', borderColor: '#fff' }}
                  color="warning"
                />
                <br />
                <TextField
                  label="Açıklama"
                  value={survey.Description}
                  onChange={(e) => setSurvey({ ...survey, Description: e.target.value })}
                  multiline={true}
                  minRows={2}
                  sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                  color="warning"
                />
                <br />
              </FormControl>
            </FormGroup>
            <br />
            <br />

            {survey.Questions.map((question, questionIndex) => (
              <React.Fragment key={questionIndex}>
                <Card>
                  <CardContent>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label={`Soru ${questionIndex + 1}`}
                          value={question.QuestionContent}
                          onChange={(e) => handleQuestionChange(e, questionIndex)}
                          color="warning"
                        />
                      </FormControl>
                      <br />
                      <FormControl>
                        <FormLabel component="legend">Soru Tipi</FormLabel>
                        <RadioGroup
                          row
                          aria-label="question-type"
                          name="question-type"
                          value={question.QuestionType}
                          onChange={(e) => handleQuestionTypeChange(e, questionIndex)}
                        >
                          <FormControlLabel
                            value="Single"
                            control={<Radio color="default" />}
                            label="Single"
                          />
                          <FormControlLabel
                            value="Multiple"
                            control={<Radio color="default" />}
                            label="Multiple"
                          />
                          <FormControlLabel
                            value="Text"
                            control={<Radio color="default" />}
                            label="Text"
                          />
                          <FormControlLabel
                            value="Progress"
                            control={<Radio color="default" />}
                            label="Progress"
                          />
                           <FormControlLabel
                            value="Checkbox"
                            control={<Radio color="default" />}
                            label="Checkbox"
                          />
                        </RadioGroup>
                      </FormControl>
                      <br />
                      <FormControl>
                        <FormLabel component="legend">Seçenekler</FormLabel>
                        <br />
                        {question.QuestionType === 'Text' ? (
                          <TextField
                            disabled
                            label="Metin"
                            id="outlined-error"
                            value={text}
                            onChange={handleTextChange}
                            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                            color="warning"
                          />
                        ) : question.QuestionType === 'Progress' ? (
                          <>
                           <Typography variant="h5">Progress Bars</Typography>
        <br />
        {question.Options.map((choice, index) => (
          <div key={index}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <FormControl fullWidth margin="normal"> 
                <TextField size='small' sx={{ backgroundColor: "white", width:"80%"}}
                color='warning'
                value={choice.OptionContent}
                label={`Seçenek ${index + 1}`}
                onChange={(e) =>
                  handleChoiceChange(e, questionIndex, index)
                }
                
                ></TextField>
                <br/>
                  <BorderLinearProgress variant="determinate"
                  
                  sx={{width:"80%"}}
                    label="Value" 
                    value={2}
                    onChange={(e) => handleProgressBarChange(e, questionIndex, index)}/>   
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <StyledButton
                size='small'
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveProgressBar(questionIndex, index)}
                sx={{marginTop:"16px"}}
              >
                Sil
              </StyledButton>
              </Grid>
             
            </Grid>
                        
           
           
            
            <br />
            <br />
          </div>
        ))}
        <div>
        <StyledButton variant="contained" color="primary" onClick={() =>handleAddProgressBar(questionIndex)}>
          Progress Bar Ekle
        </StyledButton>
        </div>
        
                          </>
                        ) : (
                          question.Options.map((choice, choiceIndex) => (
                            <FormGroup row key={choiceIndex}>
                              {question.QuestionType === 'Single' ? (
                                <RadioGroup
                                  row
                                  aria-label={`choice-${questionIndex}`}
                                  name={`choice-${questionIndex}`}
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                    <FormControlLabel
                                      key={value}
                                      value={value.toString()}
                                      control={<Radio disabled />}
                                      label={value.toString()}
                                    />
                                  ))}
                                </RadioGroup>
                              ) : question.QuestionType === 'Progress' ? (
                                <div className="w3-light-grey w3-round">
                                  <div
                                    className="w3-container w3-round"
                                    style={{
                                      width: '25%',
                                      backgroundColor: selectedColor,
                                      color: '#ffffff',
                                    }}
                                  >
                                    25%
                                  </div>
                                </div>
                              ) : (
                                 question.QuestionType === 'Multiple' ?
                                (<div>
                                  <div>
                                    <TextField
                                      label={`Seçenek ${choiceIndex + 1}`}
                                      value={choice.OptionContent}
                                      onChange={(e) =>
                                        handleChoiceChange(e, questionIndex, choiceIndex)
                                      }
                                      color="warning"
                                    />
                                    <span> </span>
                                    <StyledButton
                                      variant="contained"
                                      color="secondary"
                                      onClick={() =>
                                        handleRemoveChoice(questionIndex, choiceIndex)
                                      }
                                    >
                                      Sil
                                    </StyledButton>
                                  </div>
                                  <br />
                                </div>):
                                (
                                  <div>
                                  <div>
                                    <TextField
                                      label={`Seçenek ${choiceIndex + 1}`}
                                      value={choice.OptionContent}
                                      onChange={(e) =>
                                        handleChoiceChange(e, questionIndex, choiceIndex)
                                      }
                                      color="warning"
                                    />
                                    <span> </span>
                                    <StyledButton
                                      variant="contained"
                                      color="secondary"
                                      onClick={() =>
                                        handleRemoveChoice(questionIndex, choiceIndex)
                                      }
                                    >
                                      Sil
                                    </StyledButton>
                                  </div>
                                  <br />
                                </div>
                                )
                              )
                              
                              }
                            </FormGroup>
                          ))
                        )}
                        <br />
                        {question.QuestionType === 'Multiple' && (
                          <div>
                            <StyledButton
                              variant="contained"
                              onClick={() => handleAddChoice(questionIndex)}
                            >
                              Şık Ekle
                            </StyledButton>
                            <br />
                          </div>
                        )}
                        {question.QuestionType === 'Checkbox' && (
                          <div>
                            <StyledButton
                              variant="contained"
                              onClick={() => handleAddChoiceCheckbox(questionIndex)}
                            >
                              Şık Ekle
                            </StyledButton>
                            <br />
                          </div>
                        )}
                        
                      </FormControl>
                      <br />
                      <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveQuestion(questionIndex)}
                      >
                        Soru Sil
                      </StyledButton>
                      <br />
                    </FormGroup>
                  </CardContent>
                </Card>
                <br />
                <br />
              </React.Fragment>
            ))}

            <br />
            <StyledButton variant="contained" onClick={handleAddQuestion} sx={{ marginLeft: '2%' }}>
              Soru Ekle
            </StyledButton>

            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleSurveySubmit}
              sx={{ marginLeft: '60%' }}
            >
              Kaydet
            </StyledButton>
            <br/>
            <br/>
            <br/>

           
            
            

          </CardContent>
        </StyledCard>):(
          <StyledCard sx={{padding:"100px"}}>
            <Typography>
              Anketiniz başarıyla oluşturuldu. 
              <br></br>
              Linki paylaşarak anketinize katılım sağlayabilirsiniz.
            </Typography>
            <br/>
            <br/>
            
             <InputBase
            sx={{border:"solid", width:"50%", 
                padding:"2px", paddingLeft:"10px", 
                bgcolor:"#f5f5f5", borderRadius:"5px", border:"1px" }}           
            value={link}
            >              
            </InputBase>
            <span> </span>
            <StyledButton 
            variant="contained"
            color="primary"
              onClick={() =>  {navigator.clipboard.writeText(link);
              setSuccesAlert(true);
              }              
              }
              startIcon={<ContentCopyIcon/>}
            >
              Kopyala
            </StyledButton>
            <br/>
            <br/>
            
             { succesAlert?(<Alert severity="success">Başarıyla kopyalandı</Alert>):(<></>)}
          </StyledCard>
        )
      ) : (
        <StyledCard>
          <Typography>
            Bu sayfaya giriş yetkiniz yoktur. Lütfen giriş yapınız. :)
          </Typography>
        </StyledCard>
      )}
    </>
  );
};

export default Survey;
