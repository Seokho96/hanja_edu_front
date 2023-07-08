import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

LevelCard.propTypes = {
  product: PropTypes.object,
};

export default function LevelCard({ product }) {
  const { level, cover } = product;
  const navigate = useNavigate();

  const onClickLevel = ( level ) => {
    navigate(`/level/${level}`)
  }

  return (
    <Link color="inherit" underline="hover" style={{ cursor:'pointer' }} >
    <Card onClick={()=>onClickLevel(level)}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={level} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        
          <Typography variant="subtitle2" noWrap style={{textAlign:'center'}}>
            <b >{level}급</b>
          </Typography>
      </Stack>
    </Card>
    </Link>
  );
}
