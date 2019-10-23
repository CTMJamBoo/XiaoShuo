import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import { Button,Toast } from 'antd-mobile';
import ctx from '@/assets/js/ctx'

export class Register extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            isLook:false,
            isChoose:false,
            username:'',
            tel:'',
            password:'',
            code:'',
            isType:false,
            btnText:'获取验证码',
        }
    }
    //是否隐藏密码
    onLook=()=>{
        this.setState({
            isLook:!this.state.isLook,
            isType:!this.state.isType
        })
        console.log(this.state.isType)
    }
    //协议是否选中
    onChoose=()=>{
        this.setState({
            isChoose:!this.state.isChoose
        })
    }
    //获取用户名
    changeName=(ev)=>{
        this.setState({
            username:ev.target.value
        })
    }
    //获取手机号
    changeTel=(ev)=>{
        this.setState({
            tel:ev.target.value
        })
    }
    //获取密码
    changePsw=(ev)=>{
        this.setState({
            password:ev.target.value
        })
    }
    //获取输入框中的验证码
    changeCode=(ev)=>{
        this.setState({
            code:ev.target.value
        })
    }
    //获取手机验证码
    getCode=()=>{
        const {tel} = this.state
      
        // 校验手机号
        if(!/^1\d{10}$/.test(tel)){
            Toast.fail('请输入正确的手机号')
            return false
        }
        //开始60秒倒计时
        let num=60
        let timer = setInterval(() => {
            num--
            if(num!=0){
                this.setState({
                    btnText:`重新获取(${num})`
                })
            }else{
                this.setState({
                    btnText:'获取验证码'
                })
                clearInterval(timer)
            }
        }, 1000)

        //请求获取验证码
        this.context.axios.post('/read/api/register/getCode',{
            tel
        })
        .then((res)=>{
            const {code,msg} = res
            Toast.info(msg,1)
        })
    }
    //登录
    onRegister=()=>{
        const {username,password,tel,code,isChoose} = this.state
        // console.log(username,password,isChoose)
        //校验参数是否完整
        if(!(username&&password&&tel&&code)){
            Toast.fail('请将信息填写完整', 1);
            return false
        }

        //校验协议
        if(!(isChoose)){
            Toast.fail('未同意协议',1)
            return false
        }

        //发出请求
        this.context.axios.post('/read/api/register/useCode',{
            username,password,tel,code
        })
        .then((res)=>{
            const {code,msg} = res

            if(code == 1){
                Toast.success(msg,1)

                //注册成功跳转到登录页

                setTimeout(() => {
                    this.props.history.replace('/login')
                }, 800);
            }else{
                Toast.fail(msg,1)
            }
        })
    }
    //已有账号，直接登录
    goLogin=()=>{
        this.props.history.replace('/login')
    }
    //返回上一个路由
    onEsc=()=>{
        this.props.history.go(-1)
    }
    render() {
        const {isLook,isChoose,isType,username,password,code,tel,btnText} = this.state
        const {onLook,onEsc,onChoose,changeTel,changeName,changePsw,onRegister,changeCode,getCode,goLogin} = this
        return (
            <>
                {/* 登录 */}
                <div className={styles.header}>
                    <i onClick={onEsc} className={classnames('iconfont','icon-webicon214',styles.esc)}></i>
                    <span className={styles.login}>注册</span>
                </div>
                <div className={styles.logomod}>
                    <img className={styles.logo} src={require('@/assets/img/logo.jpg')} alt=""/>
                </div>
                {/* 登录模块 */}
                <div className={styles.loginmod}>
                    {/* 登录注册 */}
                    <div className={styles.inputmod}>
                        <div className={styles.usermod}>
                        {/* <i className={classnames('iconfont','icon-tuanduicankaoxian-',styles.kaoxian)}></i> */}
                            <input className={styles.rinput} value={username} onChange={changeName} type="text" placeholder='用户名/藏书馆号'/>
                        </div>
                        <div className={styles.telmod}>
                            <input className={styles.rinput} value={tel} onChange={changeTel} type="text" placeholder='请输入手机号'/>
                        </div>
                        <div className={styles.passmod}>
                            {/* <i className={classnames('iconfont','icon-yuechi',styles.yuechi)}></i> */}
                            <input className={styles.rinput} type={isType?'text':'password'} value={password} onChange={changePsw}  placeholder='请输入密码'/>
                            <i onClick={onLook}  className={classnames('iconfont',{
                                'icon-chakan':isLook,
                                'icon-yincang':!isLook
                            },styles.islook)}></i>
                        </div>
                        <div className={styles.codemod}>
                            <input className={styles.rinput} value={code} onChange={changeCode} type="text" placeholder='请输入验证码'/>
                            <button className={styles.getcode} onClick={getCode} disabled={btnText!='获取验证码'}>{btnText}</button>
                        </div>
                    </div>
                            {/* 按钮 */}
                    <div>
                        <div className={styles.btnmod}>
                            {/* <Button 
                            onClick={onLogin}
                            style={{width:'3.8rem',
                                    height:'0.6rem',
                                    lineHeight:'0.6rem',
                                    color:'black'}}>登录</Button> */}
                            <Button 
                            onClick={onRegister}
                            style={{backgroundColor:'#708090',
                                    width:'3.8rem',
                                    height:'0.6rem',
                                    lineHeight:'0.6rem',
                                    color:'#fff'}}>注册</Button>
                        </div>
                                {/* 协议模块 */}
                        <div className={styles.protocol}>
                            <i onClick={onChoose} className={classnames('iconfont',{
                                'icon-weixuanzhong2':!isChoose,
                                'icon-selected-copy':isChoose
                            })}></i>
                            <span>我已同意《藏书馆服务协议》及《用户隐私政策》</span>
                        </div>
                    </div>
                </div>
                    {/* 已有账号，直接登录 */}
                    <button onClick={goLogin} className={styles.goLogin}>已有账号，直接登录</button>
            </>
        )
    }

    componentDidMount(){

    }
}

export default Register
