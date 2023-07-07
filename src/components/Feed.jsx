import { Box } from '@mui/material'
import React from 'react'
import { Form, Navigate, Route, Routes } from 'react-router-dom'
import Survey from './Survey'
import AnswerSurvey from './AnswerSurvey'
import Login from './Login'
import HomePage from './HomePage'
import Result from './Result'
import LogoutModal from './LogoutModal'
import SurveyList from './SurveyList'




function Feed  () {
  return (

    <Box  flex={12} p={2} >
      <Box display="flex" justifyContent="center" alignItems="center"> 
        <Routes>
 
          <Route path="/" element={<Navigate replace to="/home" />}></Route> 
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/sign-out' element={<LogoutModal/>}></Route>
          <Route path='/survey' element={<Survey/>}></Route>
          <Route path='/survey-answer' element={<SurveyList/>}></Route>
          <Route path='/survey-answer/:id' element={<AnswerSurvey/>}></Route>
          <Route path='/survey/:id/result' element={<Result/>}></Route>

        </Routes>
      </Box>

    </Box>


  )
}

export default Feed