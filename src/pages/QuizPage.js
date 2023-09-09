import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@mui/material';

import { useParams } from 'react-router';
import agent from '../agent';
import Alert from '../utils/Alert';

export default function UserPage() {

  const { chapCode } = useParams();

const [value, setValue] = useState('');
const [quizDetail, setQuizDetail] = useState({ quizList:[{}]})
const [quizNum, setQuizNum] = useState(0)


useEffect(() => {
  if(chapCode){
    getQuizList()
    setQuizNum(0)
    setValue('')
  }
},[])

useEffect(() => {
    setValue('')
},[quizNum])

const getQuizList = () =>{
  agent.Quiz.getQuizList({ chapCode}).then(response=>{
    console.log(response);
    setQuizDetail(response.data.result)
  })
}

  const handleChangeRadio = (event, newValue) => {

    if( newValue !== value) {      
      setValue(newValue)
    }
   };

   const handleClickNext=()=>{
    quizDetail.quizList[quizNum].chioceAnswer = value
    if(quizDetail.quizList[quizNum].chapAnswer !== value){
      Alert.info('틀렸습니다')
      return
    }
      setQuizNum(quizNum+1)
   }

  return (
    <>
      <Helmet>
        <title> 퀴즈 </title>
      </Helmet>

      <Container  style={{minWidth: 400, maxWidth:800}} >
        
        <Card>
            <CardHeader title={quizDetail?.levelName} subheader={quizDetail?.chapName}/>
            <CardHeader  subheader={ `${quizDetail?.quizList?.length }번 중 ${quizNum+1}번` } />
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

 <CardContent>
          <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group" style={{fontWeight:'bold'}}>{quizDetail?.quizList && `${quizNum + 1}. ${quizDetail?.quizList[quizNum]?.qstFirstDes}`}</FormLabel>

  <FormLabel id="demo-controlled-radio-buttons-group" 
  style={{textAlign:'center', marginTop:'30px',marginBottom:'20px',fontSize:'1.4rem', color:'blue'}}>
    {quizDetail?.quizList[quizNum]?.qstSecondDes}</FormLabel>
    {
      quizDetail?.quizList[quizNum].qstChoiceYn === 'N' && 
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChangeRadio}
  >
        <>
        {quizDetail?.quizList[quizNum].chapFirstDes && <FormControlLabel value='1' control={<Radio />} label={quizDetail.quizList[quizNum].chapFirstDes} />}
        {quizDetail?.quizList[quizNum].chapSecondDes && <FormControlLabel value='2' control={<Radio />} label={quizDetail.quizList[quizNum].chapSecondDes} />}
        {quizDetail?.quizList[quizNum].chapThirdDes && <FormControlLabel value='3' control={<Radio />} label={quizDetail.quizList[quizNum].chapThirdDes} />}
        {quizDetail?.quizList[quizNum].chapFourthDes && <FormControlLabel value='4' control={<Radio />} label={quizDetail.quizList[quizNum].chapFourthDes} />}
        {quizDetail?.quizList[quizNum].chapFifthDes && <FormControlLabel value='5' control={<Radio />} label={quizDetail.quizList[quizNum].chapFifthDes} />}
        </>
  </RadioGroup>
    }
</FormControl>
</CardContent>
<CardActions style={{justifyContent: 'flex-end'}}>
        <Button size="middle" onClick={()=>handleClickNext()}>다음</Button>
      </CardActions>
        </Card>
      </Container>
    </>
  );
}
