// import {  useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';

import { useEffect, useState } from "react";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import agent from '../agent';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const userInfo =  useSelector((state) => state.member.userInfo);
  const theme = useTheme();

  const [userInfo, setUserInfo] = useState({});

  const initData = () => {
    getUserInfo();
  }

  const getUserInfo = () => {
    console.log('ss', agent.getSessionInfo());
    const {userSeq} = agent.getSessionInfo()
    // agent.Quiz.test();
    agent.User.getUserInfo(userSeq).then( response => {
      const { studentInfo, schoolInfo } = response.data.result;
      let info = {...studentInfo};
      info = {...info, ...schoolInfo};
      const levelName = (String(info.level).substring(1,2) === '2' ? '준 ' : '' )+String( info.level).substring(0,1)

      setUserInfo({...info, levelName});
    });
  }

  useEffect(() => {
    initData()
}, [])

  

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          어서와요, {userInfo.sdntName}님
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="학교" value={userInfo.schName ?? ''} icon={'school'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="학년" value={`${userInfo.sdntGrade ?? ''}학년`} color="error" icon={'grade'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="이름" value={userInfo.sdntName ?? ''} color="info" icon={'name'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="급수" value={`${userInfo.levelName ?? ''}급`} color="warning" icon={'level'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="한자 이야기"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> 

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
