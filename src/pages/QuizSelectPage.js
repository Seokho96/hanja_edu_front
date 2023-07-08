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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const { level } = useParams();


  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectTab, setSelectTab] = useState('sel');  // sel : 선정한자 , book: 교과서한자 , ancient: 고사성어

  const navigate = useNavigate();

  useEffect(() => {
    if(level){
      console.log(level);
      const numberCheck = /^[0-9]+$/; 
      if( !numberCheck.test(level) || (String(level)).length > 1 ){
        Alert.info('잘못된 접근입니다.')
        navigate('/level', { replace: true });
      }
    }
})

  const handleChange = (event, newValue) => {
   if( newValue !== selectTab) setSelectTab(newValue)
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const onClickContents = ( seq ) => {
    navigate('/quiz', { replace: true });
  }
  // const onClickTab = ( tab ) => {
  //   if( tab !== selectTab) setSelectTab(tab)
  // }

  const isNotFound = false;
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container  style={{minWidth: 400, maxWidth:800}} >
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack> */}
        <Tabs value={selectTab} onChange={handleChange} aria-label="disabled tabs example">
          <Tab label="선정한자" value="sel"/>
          <Tab label="교과서한자" value="book"/>
          <Tab label="고사성어" value="ancient"/>
          <Tab label="연습문제" disabled />
        </Tabs>

        <Card>
        <CardContent>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 300, maxWidth:800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  selectTab={selectTab}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {
                    USERLIST[`${selectTab}Hanja`]?.map( (row, idx) => {
                    const { id, name, contents } = row;
                        return(
                          <TableRow  key={id} tabIndex={-1} >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}

                        
                          
                            <TableCell component="th" align='center' scope="row" padding="none" >
                            <Stack direction="row"  spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography  variant="subtitle2" noWrap>
                               { name }
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                        

                        <TableCell  align="left">
                        {
                          row.contents.map(  (cont, idx) => 
                              <Stack direction="row" key={idx} style={{borderBottom: '1px solid black'}} spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" onClick={()=>onClickContents()}
                              noWrap fontSize="1.2rem" fontWeight="bold">
                              <br/> &nbsp;&nbsp;<span  style={{cursor:'pointer'}} >{cont}</span><br/><br/>
                              </Typography>
                            </Stack>
                            
                          )
                        }
                            
                        </TableCell>

                        {/* <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                        )
                    } )
                  }
                 
                  {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        
                          
                            <TableCell component="th" scope="row" padding="none" >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                &nbsp;&nbsp;{ name }
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                        

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
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
