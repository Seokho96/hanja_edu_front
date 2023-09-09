import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tabs,
  Tab,
  CardContent,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import Alert from '../utils/Alert';
import agent from '../agent';


// ----------------------------------------------------------------------
const USERLIST = {
  A : [
    { id:'1', name:'첫째방',contents:[ '百 千 手 足 自 立 石' ] },
    { id:'2', name:'둘째방',contents:['生 心 出 入 工 力 川' ] },
    { id:'3', name:'셋째방',contents:['男 兄 金 天 江 目']  },
  ],
  B:[
    { id:'1', name:'첫째방',contents:[ '학습, 학년, 선심, 정직, 활동', '규칙, 교실, 안전, 준비, 자세', '중요, 정리, 정확, 체육'] },
    { id:'2', name:'둘째방',contents:['발음, 질문, 분명, 시, 문법', '상상, 장면, 실감, 체험, 역할, 민속' ] },
    { id:'3', name:'셋째방',contents:['모형, 배열, 삼각형, 원, 부호', '신호, 변, 계산, 시계, 계획','시간, 식, 오전, 오후, 선','방법, 환경, 자연']  },
  ],
  C:[
    { id:'1', name:'첫째방',contents:[ '他山之石, 百發百中'] },
    { id:'2', name:'둘째방',contents:['作心三日, 男女老少' ] },
    { id:'3', name:'셋째방',contents:['此日彼日, 杜門不出']  },
  ]
}


// ----------------------------------------------------------------------



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


export default function UserPage() {

  const { level } = useParams();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectTab, setSelectTab] = useState('A');  // sel : 선정한자 , book: 교과서한자 , ancient: 고사성어
  
const [ chapterDetail, setChapterDetail ] = useState([])


  const [tabs, setTabs] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if(level){
      getTabMenu()
      getChapterDetail()
    }
},[])

useEffect(() => {
  getChapterDetail()
},[selectTab])

const getTabMenu = () => {
    agent.Common.getCommonCode({codeGubun: 'CHAPTER'}).then( response => {
      setTabs([...response.data.result])
      setSelectTab(response.data.result[0].code)
    });
}

const getChapterDetail = () => {
  // agent.Quiz.test();
  agent.Chapter.getChaptetDetail({level, chapStudyTypeCode: selectTab}).then( response => {
    const resChapterDetail = []
    response.data.result.forEach( item => {
      let findIndex = resChapterDetail.findIndex(findItem => findItem.chapCode === item.chapCode)
      if(findIndex === -1){
        resChapterDetail.push({ chapCode: item.chapCode, contents:[]})
        findIndex = resChapterDetail.length - 1
      }
      resChapterDetail[findIndex].contents.push({chapDisplay: item.chapDisplay, quizFistCode: `${level}0${item.sort}`})
    })

    console.log('resChapterDetail',resChapterDetail);
    setChapterDetail(resChapterDetail)
  });
}

  const handleChange = (event, newValue) => {
   if( newValue !== selectTab) setSelectTab(newValue)
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const onClickContents = ( chapCode ) => {
    // console.log(chapCode);
    navigate(`/quiz/${chapCode}`)
  }
  const isNotFound = false;
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container  style={{minWidth: 400, maxWidth:800}} >
        <Tabs value={selectTab} onChange={handleChange} aria-label="disabled tabs example">
        {tabs.map((tab) => (
           <Tab label={tab.codeName} value={tab.code} key={tab.code}/>
        ))}
        </Tabs>

        <Card>
        <CardContent>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 300, maxWidth:800 }}>
              <Table>
               
                <TableBody>
                {
                   chapterDetail?.map( (row, idx) => {
                    const { chapCode, contents } = row;
                        return(
                          <TableRow  key={chapCode} tabIndex={-1} >                      
                          
                            <TableCell component="th" align='center' scope="row" padding="none" >
                            <Stack direction="row"  spacing={2}>
                              <Typography  variant="subtitle2" noWrap>
                               { idx + 1 }
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                        

                        <TableCell  align="left">
                        {
                          contents.map(  (cont, idx) => 
                              <Stack direction="row" key={cont.chapDisplay} style={{borderBottom: '1px solid black'}} spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" onClick={()=>onClickContents(chapCode)}
                              noWrap fontSize="1.2rem" fontWeight="bold">
                              <br/> &nbsp;&nbsp;<span  style={{cursor:'pointer'}} >{cont.chapDisplay}</span><br/><br/>
                              </Typography>
                            </Stack>
                            
                          )
                        }
                            
                        </TableCell>
                      </TableRow>
                        )
                    } )
                  }
                 
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          </CardContent>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
