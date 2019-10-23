import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import { Modal, Button } from 'antd-mobile';

export class MyCenter extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            tel:'',
            token:'',
            username:'',
            centerList:[
                {
                    icon:'icon-xin',
                    name:'心愿单'
                },
                {
                    icon:'icon-yun', 
                    name:'云书馆'
                },
                {
                    icon:'icon-zhangjiekecheng',
                    name:'阅历'
                },
                {
                    icon:'icon-bi',
                    name:'笔记'
                },
                {
                    icon:'icon-ziyuan1',
                    name:'档案'
                }
            ],
            menuList:[
                {
                    icon1:'icon-renwuzhongxin-xinyonghuzhucedenglu',
                    name:'任务中心',
                    icon2:'icon-webicon213',
                },
                {
                    icon1:'icon-yigoushuliang',
                    name:'已购',
                    icon2:'icon-webicon213'
                },
                {
                    icon1:'icon-xiaoxi',
                    name:'消息中心',
                    icon2:'icon-webicon213'
                },
                {
                    icon1:'icon-fenxiang',
                    name:'推荐[藏书馆]给好友',
                    icon2:'icon-webicon213'
                },
                {
                    icon1:'icon-libao',
                    name:'兑换礼包',
                    icon2:'icon-webicon213'
                },
                {
                    icon1:'icon-buoumaotubiao48',
                    name:'帮助与反馈',
                    icon2:'icon-webicon213'
                },
                {
                    icon1:'icon-shezhi',
                    name:'设置',
                    icon2:'icon-webicon213'
                },
            ],
        }
    }
    //获取用户信息
    reqUserInfo=()=>{
        // console.log(this.state.token)
        this.context.axios.post('/read/api/user/t/info',{
            token:this.state.token
        })
        .then((res)=>{
            const {code,msg,info} = res

            if(code==1){
                const {username,tel} = info
                this.setState({
                    username,
                    tel
                })
            }
        })
    }
    onLogin=()=>{
        this.props.history.push('/login')
    }
    onExit=()=>{
        localStorage.setItem('token','')
        this.setState({
            token:''
        })
        this.props.history.push('/myCenter')
    }
    //点击跳转
    onSkip=(name)=>{
        // console.log(name)
        switch(name){
            case '心愿单':
                this.props.history.push('/classify')
                break;
            default:
        }
    }

    render() {
        const {tel,username,centerList,menuList} = this.state
        const {toSet,onExit,onLogin,onSkip} = this
        const token = localStorage.getItem('token')
        const alert = Modal.alert;
        return (
            <div className={styles.mycenter}>
               <div className={styles.header}>我的</div>
               <div className={styles.mymenu}>
                    {
                        token ? <Button
                        style={{
                            lineHeight: '0.4rem',
                            width: '1rem',
                            height: '0.4rem',
                            color: 'black',
                            fontSize:'0.28rem'
                        }}
                        onClick={() =>
                            alert('退出操作', '你确定要退出?', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确定', onPress: () =>onExit() },
                            ])
                        }>退出</Button> : <div onClick={onLogin}>登录</div>
                    }
               </div>
               {/* 个人中心 */}
               <div className={styles.bgImg}>
                    <div className={styles.mycentermod}>
                        <div className={styles.topmod}>
                            <div className={styles.detailmod}>
                                <div className={styles.touxiang}>
                                        <img src={require('@/assets/img/user.jpg')} alt=""/>
                                </div>
                                <div className={styles.myinter}>
                                    <p>{token?username:'请登录'}</p>
                                    <p>{token?`藏书馆号:${tel}`:'藏书馆号'}</p>
                                </div>
                            </div>
                            <i className={classnames('iconfont','icon-webicon213')}></i>
                        </div>
                            <div className={styles.btmmod}>
                                <div className={styles.quanmod}>
                                    <p>查看权益</p>
                                    <i className={classnames('iconfont','icon-webicon213')}></i>
                                </div>
                                <div className={styles.vipmod}>开通VIP</div>
                            </div>
                    </div>
               </div>
               {/* list1 */}
              <div className={styles.listmod1}>
                {centerList.map((e,i)=><p key={i} className={styles.listmod2} onClick={()=>onSkip(e.name)}>
                    <i className={classnames('iconfont',e.icon)}></i>
                    <span>{e.name}</span>
                </p>)}
              </div>
            {/* 菜单栏 */}
            <div className={styles.menumod}>
                {menuList.map((e,i)=>
                    <div key={i} className={styles.menuList} onClick={toSet}>
                        <i className={classnames('iconfont',e.icon1)}></i>
                        <span>{e.name}</span>
                        <i className={classnames('iconfont',e.icon2)}></i>
                    </div>
                )}
            </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            token:localStorage.getItem('token')
        },()=>{
            this.reqUserInfo()
        })
    }
}

export default MyCenter
