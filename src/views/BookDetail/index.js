import React, { Component } from 'react'
import ctx from '@/assets/js/ctx'
import classnames from 'classnames'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile';

export class BookDetail extends Component {
    static contextType = ctx
    constructor(){
        super()
        this.state={
            // 详情列表
            detailList:'',
            // 相关列表
            correlationList:[],
            wishList:'',
            isMore:false,
            oldBookname:'',
            oldAuthor:'',
            oldIsColor:false,
            isColor:false,
        }
    }
    //用户已登录的情况下，请求用户的心愿单图书列表
    reqWishsList=()=>{
        if(localStorage.getItem('token')){
            const {bookname,author} = this.props.match.params
            this.context.axios.post('read/api/cart/t/wishslist',{
                token:localStorage.getItem('token'),
                bookname,
                author,
            })
            .then((res)=>{
                const{code,msg,list}=res
                if(code==1){
                    const {booksname,author,isColor} = list[0]
                    this.setState({
                        oldBookname:booksname,
                        oldAuthor:author,
                        oldIsColor:isColor
                    },()=>{
                        this.reqBookDetail()
                    })
                }else{
                    this.reqBookDetail()
                }
            })
        }
    }
    //请求获取书籍详情
    reqBookDetail=()=>{
        const {oldBookname,oldAuthor,oldIsColor} = this.state
        const {bookname,author} = this.props.match.params
        if(oldBookname == bookname && oldAuthor==author){
            this.setState({
                isColor:oldIsColor
            })
        }
        this.context.axios.get('/detail/api',{
            params:{
                name:bookname
            }
        })
        .then((res)=>{
            this.setState({
                detailList:res.data.aladdin
            })
            this.setState({
                correlationList:res.data.data
            })
        })
    }
    //简介拉伸功能
    onTransform=()=>{
        this.setState({
            isMore:!this.state.isMore
        })
    }
    //猜你喜欢详情
    goDetail=(bookname,author)=>{
        this.context.axios.get('/detail/api',{
            params:{
                name:bookname
            }
        })
        .then((res)=>{
            this.setState({
                detailList:res.data.aladdin
            })
            this.setState({
                correlationList:res.data.data
            })
        })
    }
    
    //回退
    goBack=()=>{
        this.props.history.go(-1)
    }
    //添加读书
    addRead=(bookname,author,cover)=>{
        const token = localStorage.getItem('token')
        if(!token){
            this.props.history.push('/login')
        }else{
            this.context.axios.post('/read/api/cart/t/addbook',{
                token,
                bookname,
                author,
                cover
            })
            .then((res)=>{
                const {code,msg} = res
                if(code==1){
                    Toast.success(msg,1)
                }else{
                    Toast.fail(msg,1)
                }
            })
        }
    }
    toLookBooks=()=>{
        this.props.history.push('/lookBook')
    }
    //添加到心愿单列表
    addWish=()=>{
        const token = localStorage.getItem('token')
        if(!token){
            Toast.offline('请先登录',1)
            this.props.history.push('/login')
            return false
        }else{
            const {detailList} = this.state
            const {title,author,cover} = detailList
            const isColor = true
            this.setState({
                isColor
            })
            this.context.axios.post('/read/api/cart/t/wishbook',{
                token,title,author,cover,isColor
            })
            .then((res)=>{
                const {code,msg}=res
                if(code==1){
                    Toast.success(msg,1)
                }else{
                    Toast.fail(msg,1)
                }
            })
        }
       
    }

    render() {
        const {detailList,isMore,correlationList,isColor} = this.state
        const {onTransform,goDetail,goBack,addWish,addRead,toLookBooks} = this
        return (
            <div className={styles.bookdetail}>
                <div className={styles.header}>
                    <i onClick={goBack} className={classnames('iconfont','icon-webicon214')}></i>
                    <div className={styles.title}>图书详情</div>
                    <i onClick={toLookBooks} className={classnames('iconfont','icon-ziyuan')}></i>
                </div>
                {
                    detailList && 
                    <div className={styles.section}>
                        <div className={styles.sectionchild}>
                            <img src={detailList.cover} alt="加载中..."/>
                            <p>{detailList.title}</p>
                            <p className={styles.author}>{detailList.author} <i className={classnames('iconfont','icon-weixuanzhong2')}/> 著</p>
                        </div>
                        <div className={styles.sectiondetail}>
                            <h5>简介</h5>
                            <p onClick={onTransform}>{!isMore?`${detailList.desc.slice(0,30)}...`:detailList.desc}
                                <i className={classnames('iconfont',{
                                    'icon-htmal5icon45':!isMore,
                                    'icon-htmal5icon44':isMore
                                },styles.more)} />
                            </p>
                        </div>
                    </div>
                }
                {/* 猜你喜欢 */}
                <div className={styles.footertitle}>猜你喜欢</div>
                <div className={styles.correlationmod}>
                    {
                        correlationList &&
                        correlationList.map((e,i)=>
                            <div key={i} className={styles.correlation}
                                onClick={()=>goDetail(e.title,e.author)}
                            >
                                <img src={e.cover} alt=""/>
                                <p>{e.title}</p>
                            </div>
                        )
                    }
                </div>
                {/* 底部栏 */}  
                <div className={styles.footer}>
                    {/* style={{color:isColor?'#F08080':'black'}} disabled={isColor} */}
                    <button className={styles.wish} onClick={addWish} style={{color:isColor?'#F08080':'black'}} disabled={isColor}>
                        <i className={classnames('iconfont','icon-xin')}></i>
                        <span>心愿单</span>
                    </button>
                    <div className={styles.startread}>开始阅读</div>
                    <div className={styles.read} onClick={()=>addRead(detailList.title,detailList.author,detailList.cover)}>加入读书</div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.reqWishsList()
        // this.reqBookDetail()
        
    }
}

export default BookDetail
