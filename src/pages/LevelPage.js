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

  const [levels, setLevels] = useState([])

  const getUserInfo = () => {
    console.log('ss', agent.getSessionInfo());
    const {userSeq} = agent.getSessionInfo()
    // agent.Quiz.test();
    agent.User.getUserInfo(userSeq).then( response => {
      const { studentInfo } = response.data.result;

      console.log(String(studentInfo.level).substring(0,1));
      let num = 8
      let paramLevels = []
      while(num >= Number(String(studentInfo.level).substring(0,1))){ 
        paramLevels.push(num)
        num-=1;
    }

    console.log(paramLevels);

    paramLevels = paramLevels.map((_, index) => ({
        id: index,
        cover: `/assets/images/products/${ paramLevels[index]}.png`,
        level: paramLevels[index],
        colors:
          ( paramLevels[index] === 1 && PRODUCT_COLOR.slice(0, 2)) ||
          ( paramLevels[index] === 2 && PRODUCT_COLOR.slice(1, 3)) ||
          
          PRODUCT_COLOR,
      }));
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
