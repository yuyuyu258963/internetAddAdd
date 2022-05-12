import react, {  useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import CheckRoBoot from '../../Components/CapCheck/CheckRoBoot';
import { RootUrl } from '../../Constant';

const MyLoading = () => {
  const email = useRef(null)
  const pwd = useRef(null)
  
  const [captStatus,setCaptStatus] = useState<string>("default")
  
  return (
    <form className="view-loading-form" action={`${RootUrl}loading/loading`} autoComplete="off" method='get' onSubmit={(d:any) => {
        return false;
      }} >
        <div >
          <div >
          <input ref={email} autoComplete="off" type="text" placeholder="" name="email" />
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
          <input value={captStatus} name="status" style={{display:'none'}}></input>
          <CheckRoBoot  getCheckRoBootState={(val:string) => {
            setCaptStatus(val)
          }}/>
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
            <NavLink to="/register" >
                注 &nbsp;&nbsp; 册
            </NavLink>
          </div>
        </div>
      </form>
  )
}

export default  react.memo(MyLoading) ;