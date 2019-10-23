import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import ctx from '@/assets/js/ctx'
import {Toast} from 'antd-mobile'

export class Search extends Component {
    static contextType = ctx
    constructor(){
        super()

        this.state={
            search:'',
            searchList:[],
        }
    }
    //获取搜索框中输入的值
    changeSearch=(ev)=>{
        this.setState({
            search:ev.target.value
        })

        console.log(this.state.search)
        setTimeout(() => {
           this.reqSearch()
        }, 800);
      
    }
    //搜索接口
    reqSearch=()=>{
        const {search} = this.state
        console.log(search)
        this.context.axios.get('/detail/api',{
            params:{
                name:search
            }
        })
        .then((res)=>{
            const {code,msg,data}= res
            if(code==200){
                // console.log(res)
                this.setState({
                    searchList:data.data
                })
                console.log(this.state.searchList)
            }else{
                // Toast.fail(msg)
            }

        })
    }
    //跳转到详情页
    goDetail=(bookname,author)=>{
        this.props.history.push(`/bookDetail/${bookname}/${author}`)
    }
     //回退
    goBack=()=>{
        this.props.history.go(-1)
    }

    render() {
        const {changeSearch,goDetail,goBack} = this
        const {search,searchList} = this.state
        return (
            <div>
                 {/* 搜索框 */}
                 <div className={styles.header}>
                     <i onClick={goBack} className={classnames('iconfont','icon-webicon214')}/>
                    <div className={styles.searchmod}>
                        <i className={classnames('iconfont','icon-tubiaolunkuo-',styles.search)}></i>
                        <input value={search} onChange={changeSearch} className={styles.input} placeholder='输入书名或作者'/>
                    </div>
                </div>
                {/* 搜索列表 */}
                <div className={styles.list}>
                <div className={styles.title2}>搜索结果</div>
                    {
                        searchList &&
                        searchList.map((e,i)=>
                            <div key={i} className={styles.searchlist}
                            onClick={()=>goDetail(e.title,e.author)}
                            >
                                <img src={e.cover} alt=""/>
                                <div className={styles.title}>
                                    <p>书名:{e.title}</p>
                                    <p>作者:{e.author}</p>
                                    <p>标签:{e.tags}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Search
