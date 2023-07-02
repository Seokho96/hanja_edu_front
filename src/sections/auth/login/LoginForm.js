import { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LOGIN } from '../../../reducers/member';
import Alert from '../../../utils/Alert';
import agent from "../../../agent";
import { getConfig, replaceStage } from "../../../utils/common";

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/home', { replace: true });
  };
  const onClickLogin2 = (e) => {
    e.preventDefault()
    // debugger
    console.log('sss');
    const {files} = formRef.current 
    const formData = new FormData();
    formData.append('file', files[0]);
    agent.User.insertUsersByExcel(formData).then( response => {
      console.log(response);
      
    });
   
    console.log(formData);

  }
  const onClickLogin = () => {
    if(!userId || !password){
      Alert.info("아이디 또는 비밀번호를 정확히 입력해주세요.")
      return;
    }

    dispatch({
      type: LOGIN,
      payload: agent.User.login( userId, password),
      redirect: true,
      userId
    }).then(res => {
      console.log('&&&&&&',res);
    });

    // agent.User.login(userId, password).then( (res) => {
    //   if (res.data.code === '0000') {
    //     const {result} = res.data
    //     console.log(result);
    //     navigate('/home', { replace: true });
    //   }
    //   else {
    //     Alert.info(res.data.message)
    //   }
    // })
  }

  const onChangeValue = (e, type) => {
    const {value} = e.target;
    const valueMap = { userId, password}
    
    if(value === '' || valueMap[type] === value) return;

    if(type === 'userId'){
      setUserId(value);
    }
    else if( type === 'password'){
      setPassword(value);
    }
  }

  return (
    <> 
      <Stack spacing={3}>
        <TextField name="email" label="아이디"  onBlur={ (e) => onChangeValue( e, 'userId' ) }/>

        <TextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          onBlur={ (e) => onChangeValue( e, 'password' ) }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eyeFill' : 'eyeOff'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <form onSubmit={onClickLogin2}>
          <input  ref={formRef} name='file' type='file' label='파일' />
          <button type='submit'>테스트</button>
        </form>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox name="remember" />} label="아이디 저장" />
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onClickLogin}>
        로그인
      </LoadingButton>
    </>
  );
}
