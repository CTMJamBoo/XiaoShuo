import React, { Component } from 'react'
import ctx from '@/assets/js/ctx'
import styles from './index.module.scss'
import classnames from 'classnames'
import txt from '@/assets/js/txt'
// import {Pagination} from 'antd-mobile'

export class ReadBook extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            contentList: [],
            newList: [],
            prevIndex: 1,
            nextIndex: 2,
        }
    }
    //下一章
    changeNextList = () => {
        const { prevIndex, nextIndex,contentList } = this.state
        this.setState({
            newList: contentList.slice(prevIndex, nextIndex),
            prevIndex:nextIndex, 
            nextIndex:nextIndex+1
        })
    }
    //上一章
    changePrevList = () => {
        const { prevIndex, nextIndex,contentList } = this.state
       
        this.setState({
            newList: contentList.slice(prevIndex-2, nextIndex-2),
            prevIndex:prevIndex-1,
            nextIndex:nextIndex-1
        })
    }
    //回退
    goBack=()=>{
        this.props.history.go(-1)
    }
    render() {
        const { bookname, author } = this.props.match.params
        const { contentList, newList,prevIndex,nextIndex } = this.state
        const { changeNextList, changePrevList,goBack } = this
        return (
            <div className={styles.readbook}>
                {/* 顶部栏 */}
                <header>
                    <i onClick={goBack} className={classnames('iconfont', 'icon-webicon214')} />
                    <span>{bookname}</span>
                </header>
                <section>
                    {newList &&
                        newList.map((e, i) =>
                            <div key={i} className={styles.content}>
                                <p className={styles.primarytitle}>{e.title}</p>
                                <div className={styles.contents} dangerouslySetInnerHTML={{ __html: `<p>${e.contents}</p>` }}></div>
                            </div>
                        )
                    }
                </section>
                <footer>
                    <button disabled={prevIndex==1} className={styles.prevlist} onClick={changePrevList}>上一章</button>
                    <button disabled={nextIndex==txt.length+1} className={styles.nextlist} onClick={changeNextList}>下一章</button>
                </footer>
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            contentList: txt,
            newList: txt.slice(0, 1)
        })
    }
}

export default ReadBook
