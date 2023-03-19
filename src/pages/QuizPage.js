import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Container,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock


// ----------------------------------------------------------------------
const USERLIST = {
  selHanja : [
    { id:'1', name:'첫째방',contents:[ '百 千 手 足 自 立 石' ] },
    { id:'2', name:'둘째방',contents:['生 心 出 入 工 力 川' ] },
    { id:'3', name:'셋째방',contents:['男 兄 金 天 江 目']  },
  ],
  bookHanja:[
    { id:'1', name:'첫째방',contents:[ '학습, 학년, 선심, 정직, 활동', '규칙, 교실, 안전, 준비, 자세', '중요, 정리, 정확, 체육'] },
    { id:'2', name:'둘째방',contents:['발음, 질문, 분명, 시, 문법', '상상, 장면, 실감, 체험, 역할, 민속' ] },
    { id:'3', name:'셋째방',contents:['모형, 배열, 삼각형, 원, 부호', '신호, 변, 계산, 시계, 계획','시간, 식, 오전, 오후, 선','방법, 환경, 자연']  },
  ],
  ancientHanja:[
    { id:'1', name:'첫째방',contents:[ '他山之石, 百發百中'] },
    { id:'2', name:'둘째방',contents:['作心三日, 男女老少' ] },
    { id:'3', name:'셋째방',contents:['此日彼日, 杜門不出']  },
  ]
}
const TABLE_HEAD = [
  { id: 'name', label: '단원', alignCenter: true, width:100},
  { id: 'contents', label: {sel:'선정한자', book:'교과서한자', ancient:'고사성어'}, alignRight: false },
  // { id: 'role', label: '교과서한자', alignRight: false },
  // { id: 'isVerified', label: '고사성어', alignRight: false },
  // { id: 'status', label: '연습문제', alignRight: false },
];

// ----------------------------------------------------------------------


export default function UserPage() {

  const [selectTab, setSelectTab] = useState('sel');  // sel : 선정한자 , book: 교과서한자 , ancient: 고사성어

const [value, setValue] = useState('');


  const handleChange = (event, newValue) => {
   if( newValue !== selectTab) setSelectTab(newValue)
  };


  const handleChangeRadio = (event, newValue) => {
    if( newValue !== value) setValue(newValue)
   };



  // const onClickTab = ( tab ) => {
  //   if( tab !== selectTab) setSelectTab(tab)
  // }

  const isNotFound = false;
  return (
    <>
      <Helmet>
        <title> 퀴즈 </title>
      </Helmet>

      <Container  style={{minWidth: 400, maxWidth:800}} >
        
        <Card>
            <CardHeader title="5급" subheader="선정한자"/>
            <CardHeader  subheader="20문제 중 1번" />
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

 <CardContent>
          <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">1. 이것은 문제입니다. 무엇일까요?</FormLabel>
  <CardMedia
        sx={{ height: 140 }}
        image="/assets/images/avatars/avatar_1.jpg"
        title="green iguana"
      />
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChangeRadio}
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
  </RadioGroup>
</FormControl>
</CardContent>
<CardActions style={{justifyContent: 'flex-end'}}>
        <Button size="middle">다음</Button>
      </CardActions>
        </Card>
      </Container>
    </>
  );
}
