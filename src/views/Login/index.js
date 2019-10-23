import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import { Button,Toast } from 'antd-mobile';
import ctx from '@/assets/js/ctx'

export class Login extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            isLook:false,
            isChoose:false,
            username:'',
            password:'',
            isType:false,
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
    //获取密码
    changePsw=(ev)=>{
        this.setState({
            password:ev.target.value
        })
    }
    //登录
    onLogin=()=>{
        const {username,password,isChoose} = this.state
        // console.log(username,password,isChoose)
        //校验参数是否完整
        if(!(username&&password)){
            Toast.fail('请将信息填写完整', 1);
            return false
        }

        //校验协议
        if(!(isChoose)){
            Toast.fail('未同意协议',1)
            return false
        }

        //发出请求
        this.context.axios.post('/read/api/login/t',{
            username,password,tel:username
        })
        .then((res)=>{
            const {code,msg,token} = res

            if(code == 1){
                Toast.success(msg,1)
                //将token存到localStorage中
                localStorage.setItem('token',token)

                setTimeout(() => {
                    this.props.history.goBack()
                }, 800);
            }else{
                Toast.fail(msg,1)
            }
        })
    }
    //跳转到注册组件
    goRegister=()=>{
        this.props.history.push('/register')
    }
    //返回上一个路由
    onEsc=()=>{
        this.props.history.go(-1)
    }
    render() {
        const {isLook,isChoose,isType,username,password} = this.state
        const {onLook,onChoose,changeName,changePsw,onLogin,goRegister,onEsc} = this
        return (
            <>
                {/* 登录 */}
                <div className={styles.header}>
                    <i onClick={onEsc} className={classnames('iconfont','icon-webicon214',styles.esc)}></i>
                    <span className={styles.login}>登录</span>
                </div>
                <div className={styles.logomod}>
                    <img className={styles.logo} src={require('@/assets/img/logo.jpg')} alt=""/>
                </div>
                {/* 登录模块 */}
                <div className={styles.loginmod}>
                    {/* 登录注册 */}
                    <div className={styles.inputmod}>
                        <div className={styles.usermod}>
                        <i className={classnames('iconfont','icon-tuanduicankaoxian-',styles.kaoxian)}></i>
                            <input value={username} onChange={changeName} type="text" placeholder='藏书馆号/手机号'/>
                        </div>
                        <div className={styles.passmod}>
                            <i className={classnames('iconfont','icon-yuechi',styles.yuechi)}></i>
                            <input type={isType?'text':'password'} value={password} onChange={changePsw}  placeholder='请输入密码'/>
                            <i onClick={onLook}  className={classnames('iconfont',{
                                'icon-chakan':isLook,
                                'icon-yincang':!isLook
                            },styles.islook)}></i>
                        </div>
                    </div>
                            {/* 忘记密码 */}
                    <div className={styles.forgetpsw}>
                        <p>忘记密码?</p>
                    </div>
                            {/* 按钮 */}
                    <div className={styles.btnmod}>
                        <Button 
                        onClick={onLogin}
                        style={{width:'3.8rem',
                                height:'0.6rem',
                                lineHeight:'0.6rem',
                                border:'1px solid #777',
                                color:'black'}}>登录</Button>
                        <Button 
                        onClick={goRegister}
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
                    
            </>
        )
    }

    componentDidMount(){

    }
}

export default Login
