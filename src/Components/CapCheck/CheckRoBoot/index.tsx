import React, {Component} from "react";
import GoCaptchaBtn from '../GoCaptchaBtn'
import Lodash from 'lodash'
import "./style.css"
import 'antd/dist/antd.css';
import { message } from 'antd';
import { getImgUrl, RunConfirm } from "../../../axios";

export default class CheckRoBoot extends Component<any,any> {
  constructor(props:any) {
    super(props);

    this.state = {
      needCapt: false,
      popoverVisible: true,
      captBase64: '',
      captThumbBase64: '',
      captKey: '',
      captStatus: 'default',
      captExpires: 0,
      captAutoRefreshCount: 0,
    }
  }

  render() {
    const {captStatus, captBase64, captThumbBase64} = this.state
    const {getCheckRoBootState} = this.props
    return (
        <div className="go-captcha-wrap">
          <GoCaptchaBtn
            class="go-captcha-btn"
            value={captStatus}
            width="80%"
            height="50px"
            imageBase64={captBase64}
            thumbBase64={captThumbBase64}
            changeValue={(val:any) =>  {
              this.setState({captStatus: val})
              getCheckRoBootState(val)
            }}
            confirm={this.handleConfirm}
            refresh={this.handleRequestCaptCode}
          />
        </div>
    );
  }

  // ================= Methods ================
  /**
   * 处理请求验证码
   */
  handleRequestCaptCode = () => {
    this.setState({
      captBase64: '',
      captThumbBase64: '',
      captKey: ''
    })

    getImgUrl().then((response)=>{
      const {data = {}} = response;
      const {captBase64,captThumbBase64,captKey} = data;
      if ((data['code'] || 0) === 0) {
        if (Lodash.isEmpty(data)) {
          return
        }
        this.setState({
          captBase64: captBase64 || '',
          captThumbBase64:  captThumbBase64 || '',
          captKey:  captKey || ''
        })
      } else {
        message.warning(`获取人机验证数据失败`)
      }
      // console.dir(response)
    })
  }
  /**
   * 处理验证码校验请求
   */
  handleConfirm = (dots: any) => {
    if (Lodash.size(dots) <= 0) {
      message.warning(`请进行人机验证再操作`)
      return
    }

    const data = {
      dots: dots,
      key: this.state.captKey || ''
    }

    RunConfirm(data as any).then((response) => {
      const {data = {}} = response;
      // console.dir(data)

      if ((data['code'] || 0) === 0) {
        message.success(`人机验证成功`)
        this.setState({
          captStatus: 'success',
          captAutoRefreshCount: 0
        })
        this.props.getCheckRoBootState('success')
      } else {
        const {captAutoRefreshCount = 0} = this.state
        message.warning(`人机验证失败`)

        if (captAutoRefreshCount > 5) {
          this.setState({
            captStatus: 'overing',
            captAutoRefreshCount: 0
          })
          this.props.getCheckRoBootState('overing')

          return
        }

        this.handleRequestCaptCode()
        this.setState({
          captStatus: 'error',
          captAutoRefreshCount: captAutoRefreshCount + 1
        })
        this.props.getCheckRoBootState('error')
      }
    })

  }
}
