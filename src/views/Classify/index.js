import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import axios from '@/assets/js/axios'
import { Modal, Button, Toast } from 'antd-mobile';

export class Classify extends Component {
    constructor(){
        super()

        this.state={
            wishList:[],
            isRedact:true,
            isDisplay:true,
        }
    }
    //请求数据库中指定用户的心愿单列表
    reqWishList=()=>{

        axios.post('/read/api/cart/t/wishlist',{
            token:localStorage.getItem('token')
        })
        .then((res)=>{
            // console.log(res)
            const {code,msg,list} =res
            if(code==1){
                this.setState({
                    wishList:list
                })
            }
        })
    }
    goBack=()=>{
        this.props.history.goBack(0)
    }
    onRedact=()=>{
        this.setState({
            isRedact:!this.state.isRedact,
            isDisplay:!this.state.isDisplay
        }) 
    }
    onDelete=(wishId)=>{
        axios.post('/read/api/cart/t/wishdel',{
            wishId,
            token:localStorage.getItem('token')
        })
        .then((res)=>{
            const {code,msg} = res
            if(code==1){
                Toast.success(msg,1)
                this.reqWishList()
            }else{
                Toast.fail(msg,1)
            }
        })
    }
    render() {
        const {wishList,isRedact,isDisplay} = this.state
        const {goBack,onRedact,onDelete} = this
        const alert = Modal.alert;
        // console.log(wishList)
        return (
            <div className={styles.classify}>
                {/* 顶部 */}
                <div className={styles.classifyhead}>
                    <i onClick={goBack} className={classnames('iconfont','icon-fanhui')}/>
                    <p>心愿单</p>
                    <div className={styles.redact} onClick={onRedact}>{
                    isRedact?'编辑' : "完成"
                }</div>
                </div>
                <div className={styles.wishnav}>
                    <span>封面</span>
                    <span>书名</span>
                    <span>作者</span>
                </div>
                {/* 心愿单列表 */}
                <div className={styles.wishmod}>
                    {
                        wishList && 
                        wishList.map((e,i)=>
                        <ul key={i} className={styles.wishlist}>
                            <li>
                                <img src={e.bookimg} alt=""/>
                                <p>{e.booksname}</p>
                                <p>{e.author}</p>
                                <Button
                                    style={{
                                    position:'absolute',
                                    top:'-0.3rem',
                                    right:0,
                                    color:'red',
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
                                        移除
                                </Button>
                            </li>
                        </ul>
                        )
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.reqWishList()
    }
}

export default Classify
