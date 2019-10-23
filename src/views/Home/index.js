import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'

export class Home extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            hotList:[],
            recommendList:[],
        }
    }
    //请求热门小说接口
    reqHotList=()=>{
        
        this.context.axios.post('/hot/api/novelApi')
        .then((res)=>{
            this.setState({
                hotList:res.data
            })
        })
    }
    //推荐接口
    reqRecommend=()=>{

        this.context.axios.post('/tuijian/api')
        .then((res)=>{
            this.setState({
                recommendList:res.data.module
            })
        })
    }
    //换一批
    updateHot=()=>{
        this.reqHotList()
    }
    //跳转到分类
    toClassify=()=>{
        this.props.history.push('/bookList')
    }
    //跳转到图书详情页
    goDetail=(bookname,author)=>{
        this.props.history.push(`/bookDetail/${bookname}/${author}`)
    }
    //跳转到搜索
    onSearch=()=>{
        this.props.history.push('/search')
    }
    //查看更多
    toMore=()=>{
        this.props.history.push('/bookList')
    }
    render() {
        const {hotList,recommendList} = this.state
        // console.log(hotList)
        const {updateHot,toClassify,goDetail,onSearch,toMore} = this
        // console.log(recommendList[8])
        const list2=recommendList[8]
        const list=list2 && list2.content.slice(0,4)
        // console.log(list)
        return (
           <>
                {/* 搜索框 */}
                <div className={styles.header}>
                    <div className={styles.searchmod} onClick={onSearch}>
                        <i className={classnames('iconfont','icon-tubiaolunkuo-',styles.search)}></i>
                        <input className={styles.input} placeholder='输入书名或作者'/>
                    </div>
                </div>
                {/* 热门话题 */}
                <div className={styles.discuss}>
                    <div className={styles.discusstop}>
                        <img className={styles.discussimg} src='http://img4.imgtn.bdimg.com/it/u=3665780329,1066489329&fm=214&gp=0.jpg' alt='..'/>
                        <p>最令你难忘的书中句子</p>
                    </div>
                    <div className={styles.discussbom}>
                        <span>参与话题</span>
                        <span className={classnames('iconfont','icon-webicon213')}></span>
                    </div>
                </div>
                {/* 功能分类 */}
                <ul className={styles.classify }>
                    <li onClick={toClassify}>
                        <i className={classnames('iconfont','icon-fenlei')}></i>
                        <p>分类</p>
                    </li>
                    <li>
                        <i className={classnames('iconfont','icon-shuji')}></i>
                        <p>书摘</p>
                    </li>
                    <li>
                        <i className={classnames('iconfont','icon-zhangjiekecheng')}></i>
                        <p>课程</p>
                    </li>
                    <li>
                        <i className={classnames('iconfont','icon-xiaoxi')}></i>
                        <p>广场</p>
                    </li>
                </ul>
                {/* 随便看看 */}
                <h4>随便看看</h4>
                <div className={styles.hotmod} >
                    {hotList && hotList.map((e,i)=>
                        <div key={i} className={styles.everymod} onClick={()=>goDetail(e.bookname,e.author_name)}>
                            <div className={styles.imgmod}>
                                <img src={e.book_cover} alt="加载中..."/>
                            </div>
                            <p>{e.bookname}</p>
                        </div>
                    )}
                </div>
                {/* 换一批 */}
                <div className={styles.updatebtn}>
                    <button className={styles.btn} onClick={updateHot}>换一批</button>
                </div>

                {/* 推荐列表 */}
                <div className={styles.titlemod}>
                    <h4>推荐小说</h4>
                    <div className={styles.chakanmod}>
                        <p onClick={toMore}>更多</p>
                        <i className={classnames('iconfont','icon-webicon213')}></i>
                    </div>
                </div>
                <div className={styles.recommendmod}>
                    {
                      list && list.map((e,i)=>
                            <div key={i} className={styles.everymod} onClick={()=>goDetail(e.bookname,e.author_name)}>
                                <div className={styles.imgmod}>
                                    <img src={e.book_cover} alt="加载中..."/>
                                </div>
                                <div className={styles.rightmod}>
                                    <p className={styles.title}>{e.bookname}</p>
                                    <p>{e.book_info}</p>
                                    {/* <p>{e.stat_name}</p> */}
                                    <p>{e.author_name}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
           </>
        )
    }
    componentDidMount(){
        this.reqHotList()
        this.reqRecommend()
    }
}

export default Home
