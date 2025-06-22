import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
  <Switch 
    focusVisibleClassName=".Mui-focusVisible" 
    disableRipple {...props} 
    icon={
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          fontWeight: 'bold',
          fontSize: 10,
          color: '#000',
          background: '#fff',
          borderRadius: '50%'
        }}
      >
        24h
      </span>
    }
    checkedIcon={
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          fontWeight: 'bold',
          fontSize: 10,
          color: '#000',
          background: '#fff',
          borderRadius: '50%'
        }}
      >
        12h
      </span>
    }
/>
))(({ theme }) => ({
  width: 60,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#000',
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
  },
  '& .MuiSwitch-track': {
    borderRadius: 32 / 2,
    backgroundColor: '#000000',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#000000',
    }),
    '&:before': {
      content: '"24h"',
      position: 'absolute',
      left: '4px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#fff',
      fontSize: '10px',
      fontWeight: 'bold',
      zIndex: 0,
      transition: 'color 300ms',
    },
    '&:after': {
      content: '"12h"',
      position: 'absolute',
      right: '4px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#fff',
      fontSize: '10px',
      fontWeight: 'bold',
      zIndex: 0,
      transition: 'color 300ms',
    },
  },
}));

export default function TimeFormatSwitch() {
    return <IOSSwitch sx={{ m: 1 }} defaultChecked inputProps={{ 'aria-label': 'Switch time format' }}/>
}