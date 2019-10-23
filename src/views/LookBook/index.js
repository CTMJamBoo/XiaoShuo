import React, { Component } from 'react'
import classnames from 'classnames'
import ctx from '@/assets/js/ctx'
import styles from './index.module.scss'
import { Modal, Button, Toast } from 'antd-mobile';

export class LookBook extends Component {
    static contextType = ctx
    constructor() {
        super()

        this.state = {
            bookList: [],
            isRedact:true,
            isDisplay:true,
        }
    }
    //判断用户是否登录
    reqEstimate = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({
                bookList: ''
            })
        } else {
            this.context.axios.post('/read/api/cart/t/booklist', {
                token
            })
                .then((res) => {
                    const { code, msg, list } = res
                    // console.log(res)
                    if (code == 1) {
                        this.setState({
                            bookList: list
                        })
                    }
                })
        }
    }
    
    //跳转到开始阅读
    readBook = (bookname, author) => {
        this.props.history.push(`/readBook/${bookname}/${author}`)
    }
    //跳转
    toSkip=(num)=>{
        if(num==1){
            this.props.history.push('/home')
        }else{
            this.props.history.push('/search')
        }
    }

    onRedact=()=>{
        this.setState({
            isRedact:!this.state.isRedact,
            isDisplay:!this.state.isDisplay
        })
    }
    onDelete=(bookId)=>{
        // console.log(bookId)
        this.context.axios.post('/read/api/cart/t/bookdel',{
            bookId,
            token:localStorage.getItem('token')
        })
        .then((res)=>{
            // console.log(res)
            const {code,msg} = res
            if(code==1){
                Toast.success(msg,1)
                this.reqEstimate()
            }else{
                Toast.fail(msg,1)
            }
        })
    }
    render() {
        // const {myTarget} = this.state
        const { bookList,isRedact,isDisplay } = this.state
        const { readBook,toSkip,onRedact,onDelete } = this
        const operation = Modal.operation;
        const alert = Modal.alert;
        return (
            <div>
                {/* header */}
                <div className={styles.headtitle}>读书</div>
                <div className={styles.redact} onClick={onRedact}>{
                    isRedact?'编辑' : "完成"
                }</div>
                {/* 书籍框架 */}
                <div className={styles.bookList}>
                    {
                        bookList ?
                            <ul className={styles.bookrack} ref='myBooks'>
                                {
                                    bookList.map((e, i) =>
                                        <li ref='myBook' className={styles.specification} key={i}>
                                            <img className={styles.bookimg} src={e.bookimg} alt="" />
                                            <p>{e.bookname}</p>
                                            {/* <div className={styles.del} style={{
                                                display:isDisplay?'none':'block',
                                            }} onClick={()=>onDelete(e._id)}>×</div> */}
                                            
                                            <Button
                                                style={{
                                                position:'absolute',
                                                top:'-0.3rem',
                                                right:0,
                                                backgroundColor:'transparent',
                                                display:isDisplay?'none':'block',
                                            }}
                                                onClick={() =>
                                                    alert('移除书籍', '确认移除此书?', [
                                                    { text: '取消', onPress: () => console.log('cancel') },
                                                    { text: '移除', onPress: () => onDelete(e._id) },
                                                    ])
                                                }
                                                >
                                                    <i style={{color:'red'}} className={classnames('iconfont','icon-shanchu')} />
                                            </Button>
                                        </li>
                                    )
                                }
                                <li onClick={() => readBook('使用说明书', '管理员')}
                                    className={styles.specification}>
                                    <img className={styles.bookimg} src={require('@/assets/img/specification.jpg')} alt="加载中..." />
                                    <p>藏书馆说明书</p>
                                </li>
                                <li className={styles.addbook}>
                                    {/* <i className={classnames('iconfont','icon-jia',styles.addicon)}/> */}
                                    <Button onClick={() => operation([
                                       { text: '前往找书', onPress: () => toSkip(1)},
                                       { text: '搜索书籍', onPress: () => toSkip(2)},
                                        ])}> 
                                        <i className={classnames('iconfont','icon-jia',styles.addicon)}/>
                                    </Button>
                                </li>
                            </ul>
                            : 
                            <ul className={styles.bookrack}>
                                 <li onClick={() => readBook('使用说明书', '管理员')}
                                    className={styles.specification}>
                                    <img className={styles.bookimg} src={require('@/assets/img/specification.jpg')} alt="加载中..." />
                                    <p>藏书馆说明书</p>
                                </li>
                                <li className={styles.addbook}>
                                    {/* <i className={classnames('iconfont','icon-jia',styles.addicon)}/> */}
                                    <Button onClick={() => operation([
                                       { text: '前往找书', onPress: () => toSkip(1)},
                                       { text: '搜索书籍', onPress: () => toSkip(2)},
                                        ])}> 
                                        <i className={classnames('iconfont','icon-jia',styles.addicon)}/>
                                    </Button>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.reqEstimate()
    }
}

export default LookBook
