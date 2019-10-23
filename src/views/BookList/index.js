import React, { Component } from 'react'
import ctx from '@/assets/js/ctx'
import {PullToRefresh,ListView,Tabs, Toast} from 'antd-mobile'
import styles from './index.module.scss'
import classnames from 'classnames'
import BooksItem from '@/components/BooksItem'
import BackToTop from '@/components/BackToTop'

export class BookList extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            booksList:[],//图书列表
            pageNum:1,//页数
            refreshing:false,//是否正在刷新
            dataSource:new ListView.DataSource({
                //listView组件的数据源
                rowHasChanged:(row1,row2)=>row1!==row2
            }),
            isLoadingMore:false,//是否正在加载更多中
            isAllLoaded:false,//是否全部加载完毕
            tabs:[//选项卡的选项
                {title:'全部',value:''},
                {title:'历史',value:'历史'},
                {title:'萌系',value:'萌系'},
                {title:'虚拟网游',value:'虚拟网游'},
            ],
            types:'',//被选中的商品类别
        }
    }

     //推荐接口
    //  reqRecommend=()=>{

    //     this.context.axios.post('/tuijian/api')
    //     .then((res)=>{
    //         this.setState({
    //             recommendList:res.data.module
    //         })
    //     })
    // }
    //请求获取图书列表，参数是请求的页数
    reqBooksList=(pageNum)=>{
        const {types} = this.state
        // console.log(types)
        return this.context.axios.post('/read/api/books/list',{
            pageNum,
            types
        })
    }
    //  下拉刷新
    onRefresh=()=>{
        //显示顶部的loading
        this.setState({
            refreshing:true
        })
        this.reqBooksList(1)
        .then((res)=>{
            const {code,msg,list}=res

            if(code==1){
                this.setState({
                    booksList:list,//将整个列表的数据替换成第一页的数据
                    pageNum:1,//页数为1
                    dataSource:this.state.dataSource.cloneWithRows(list)//改变数据源
                })
            }else{
                Toast.fail(msg,1)
            }
            //隐藏顶部的loading，还要开启上拉加载更多
            this.setState({
                refreshing:false,
                isAllLoaded:false
            })
        })
        
    }

    //上拉更多加载
    onEndReached=()=>{
        //如果全部加载完毕，就不再执行上拉更多加载的代码
        if(this.state.isAllLoaded) return false

        //如果上一次的加载还没有结束，就不能继续加载
        if(this.state.isLoadingMore) return false

        //修改底部状态,显示正在加载更多
        this.setState({
            isLoadingMore:true
        })
        //请求获取下一页的数据
        this.reqBooksList(this.state.pageNum+1)
        .then((res)=>{
            const {code,msg,list}=res
            if(code==1){
                if(list.length){
                    //将下一列的数据追加到上一页的后面
                    const booksList = this.state.booksList.concat(list)

                    this.setState({
                        booksList,//更新整个列表数据
                        pageNum:this.state.pageNum+1,//页数加1
                        dataSource:this.state.dataSource.cloneWithRows(booksList),//使用更新之后的数据源
                    })
                }else{
                    //关闭上拉加载更多
                    this.setState({
                        isAllLoaded:true
                    })
                }
            }else{
                Toast.fail(msg,1)
            }
            //修改底部状态，不要显示正在加载更多
            this.setState({
                isLoadingMore:false
            })
        })
    }
    //分类
    changeType=(tab,index)=>{
        //获取当前选项中的商品类别
        const types = tab.value
        //把选中的商品类别保存到state中
        this.setState({
            types
        },//为了确保在setState方法执行完了之后再执行后面的代码，就要把这部分代码放在setState的回调函数中
        ()=>{
            //请求获取第一页,就带上这个商品类别
            this.onRefresh()
        }
        )
    }
    //回退
    goBack=()=>{
        this.props.history.go(-1)
    }
    //
    goCenter=()=>{
        this.props.history.push('/myCenter')
    }
    render() {
        // const {recommendList} = this.state
        // const bookList = recommendList[8]
        const {booksList,tabs,refreshing,dataSource,isLoadingMore,isAllLoaded} = this.state
        const {onEndReached,onRefresh,changeType,goBack,goCenter} = this
        // console.log(bookList)
        return (
            <>
                 <div className={styles.header}>
                    <i onClick={goBack} className={classnames('iconfont','icon-webicon214')}></i>
                    <div className={styles.title}>图书列表</div>
                    <i onClick={goCenter} className={classnames('iconfont','icon-tuanduicankaoxian-')}></i>
                </div>
                {/* <div>
                    <div className={styles.center}></div>
                </div> */}
                {/* 使用tabs组件，实现选项卡 */}
                <Tabs tabs={tabs} onChange={changeType} prefixCls='booksList-tabs' />
                <div className={styles.booksList}>
                    {/* 使用PullToRefresh组件，实现下拉刷新，可以单独使用，也可以和listView结合使用
                        refreshing属性表示是否正在下拉刷新中，如果是，就会在顶部显示一个loading
                        onRefresh属性表示用户执行下拉刷新动作调用的函数，通常用来请求获取列表的第一页的数据
                    */}
                    {/* 
                    使用listview组件，实现下拉刷新和上拉加载更多
                    dataSource属性表示数据源，也就整个列表的数据
                    renderRow属性表示每条列表数据的渲染函数，
                    函数的第一个参数就是每个列表的数据，函数的返回结果就是每个列表的组件

                    useBodyScroll属性表示是否使用在body上滚动，如果是，
                    就不要加样式，如果不是就要设置高度

                    pullToRefresh属性表示下拉刷新的配置选项
                    onendreachedthreshold属性表示加载更多的触底距离
                    renderfooter属性表示底部的渲染函数
                */}
                <ListView
                    dataSource={dataSource}
                    renderRow={
                        (rowData,sectionID,rowID)=>{
                            return <BooksItem itemInfo={rowData} history={this.props.history} />
                        }
                    }
                    useBodyScroll={true}
                    pullToRefresh={
                        <PullToRefresh 
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                    }
                    onEndReached={onEndReached}
                    onEndReachedThreshold={1}
                    renderFooter={
                        ()=>( <div style={{padding:30,textAlign:'center'}}>
                            {isLoadingMore ? '正在加载更多' : (isAllLoaded ? '没有更多了' : '')}
                        </div> )
                    }
                />
                </div>
                <BackToTop/>
            </>
        )
    }
    componentDidMount(){
        // this.reqRecommend()
        //请求获取第一页的数据，相当于手动执行一次下拉刷新
        this.onRefresh()
    }
    componentWillUnmount(){
        //手动销毁DOM节点上的绑定的事件
        window.onscroll = null
    }
}

export default BookList
