import react, { useRef } from 'react'
import { NavLink } from 'react-router-dom';

import "./index.scss"

function FindPwd() {
  const email = useRef(null)
  const pwd = useRef(null)
  
  return (
    <form className="view-loading-form" autoComplete="off" >
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
          <NavLink to="/loading" style={{marginLeft:-10,marginRight:10}} >
              登 &nbsp;&nbsp; 录
          </NavLink>
          <NavLink to="/register" >
              注 &nbsp;&nbsp; 册
          </NavLink>
        </div>
      </div>
    </form>
  )
}

export default react.memo(FindPwd);