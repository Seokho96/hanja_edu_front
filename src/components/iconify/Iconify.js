import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import BadgeIcon from '@mui/icons-material/Badge';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// ----------------------------------------------------------------------

// const Iconify = forwardRef(({ icon }, ref) => (
//   {icon}
//   // <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
// ));

const Iconify = forwardRef(({ icon }, ref) => {

  if(icon === 'school') return ( <SchoolIcon />)
  if( icon === 'name') return ( <BadgeIcon />)
  if( icon === 'grade') return ( <GradeIcon />)
  if(icon === 'level')return (<MilitaryTechIcon />)
  if(icon === 'eyeFill')return (<VisibilityIcon />)
  if(icon === 'eyeOff')return (<VisibilityOffIcon />)

  return (<MenuIcon/>)
});

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Iconify;
