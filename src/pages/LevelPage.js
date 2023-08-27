import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, LevelList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import agent from '../agent';
// ----------------------------------------------------------------------
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [studentInfo, setStudentInfo] = useState({})
  const [levels, setLevels] = useState([])

  const getUserInfo = () => {
    const {userSeq} = agent.getSessionInfo()
    agent.User.getUserInfo(userSeq).then( response => {
    const { studentInfo : resStudentInfo } = response.data.result;
    console.log('response', response);
    setStudentInfo(resStudentInfo)
    let paramLevels = []

    paramLevels = ['81','71','61','52','51','42','41','32','31','22','21','12','11'].map((item, index) => ({
        id: index,
        cover: `/assets/images/products/${item.substring(0,1)}.png`,
        levelName: `${item.substring(1,2) === '2' ? '준':''}${item.substring(0,1)}급`,
        level: item,
        colors:
          ( item.substring(0,1) === '1' && PRODUCT_COLOR.slice(0, 2)) ||
          ( item.substring(0,1) === '2' && PRODUCT_COLOR.slice(1, 3)) ||
          
          PRODUCT_COLOR,
      }));
      const findIndex = paramLevels.findIndex(item => item.level === String(resStudentInfo.level))

      console.log('paramLevels', resStudentInfo.level);
      paramLevels = paramLevels.filter((item,idx)=> idx <= findIndex)
      console.log('paramLevels',paramLevels);
      setLevels(paramLevels)
    });
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: 급수선택 | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          급수선택
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        <LevelList products={levels} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
