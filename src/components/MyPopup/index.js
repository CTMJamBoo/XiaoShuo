import React, { Component } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'

export class MyPopup extends Component {
    //设置props的默认值
    static defaultProps = {
        visible:false,//弹窗的显示状态
        hidePopup:null//改变显示状态
    }

    //设置props的类型
    static propTypes = {
        visible:PropTypes.bool,
        hidePopup:PropTypes.func
    }


    render() {
        const {visible,hidePopup,children} = this.props
        return (
           <>
                {
                    visible &&
                    <div className='myPopup'>
                        <div className={styles.layer} onClick={hidePopup}></div>
                    <div className={styles.container}>{children || '请传入弹窗的内容'}</div>
                    </div>
                }
           </>
        )
    }
}

export default MyPopup
