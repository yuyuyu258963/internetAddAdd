import react, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { RootUrl } from '../../Constant';

const Register = () => {
  const email = useRef(null)
  const pwd = useRef(null)
  
  return (
    <form className="view-loading-form" action={`${RootUrl}loading/loading`} autoComplete="off" >
      <div >
        <div >
        <input ref={email} autoComplete="off" type="text" placeholder=""  />
        <label  >邮 &nbsp;&nbsp; 箱</label>
        </div>
      </div>
      <div >
        <div >
        <input ref={pwd} autoComplete="new-password" type="password" placeholder="" name="pwd" />
        <label  >密 &nbsp;&nbsp; 码</label>
        </div>
      </div>
        <div >
          <button id="bnt-submit" type="submit"
          >登录</button>
        </div>
      <div>
        <div>
          <NavLink to="/findPwd" style={{marginLeft:-10,marginRight:10}} >
              忘记密码
          </NavLink>
          <NavLink to="/loading" >
              登 &nbsp;&nbsp; 录
          </NavLink>
        </div>
      </div>
    </form>
  )
}

export default react.memo(Register);