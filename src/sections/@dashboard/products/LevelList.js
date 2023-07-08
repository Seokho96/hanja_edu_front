import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import LevelCard from './LevelCard';

// ----------------------------------------------------------------------

LevelList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function LevelList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <LevelCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
