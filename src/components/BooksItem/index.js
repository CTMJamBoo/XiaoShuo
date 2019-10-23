import React, {Component} from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
// import {withRouter} from 'react-router-dom'

// @withRouter


export class BooksItem extends Component {
    static contextType = ctx

     //跳转到图书详情页
     goDetail=(bookname,author)=>{
        this.props.history.push(`/bookDetail/${bookname}/${author}`)
    }

    render() {
        const {itemInfo} = this.props
        // console.log(itemInfo)
        const {goDetail} = this
        return (
            <div className={styles.booksItem}>
                <div className={styles.booksmod}>
                    <img onClick={()=>goDetail(itemInfo.bookname,itemInfo.author)} className={styles.cover} src={itemInfo.cover} alt=""/>
                </div>
                <div className={styles.rightmod}>
                    <p className={styles.bookname}>{itemInfo.bookname}</p>
                    <p className={styles.author}>{itemInfo.author}</p>
                    <p className={styles.desc}>{itemInfo.desc}</p>
                </div>
                
            </div>
        )
    }
}
export default BooksItem
