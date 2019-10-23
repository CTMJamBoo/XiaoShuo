import React, { Component } from 'react'
import styles from './index.module.scss'

export class VipCenter extends Component {
    render() {
        return (
            <div className={styles.vipCenter}>
                <img src={require('@/assets/img/vip.jpg')} alt=""/>
            </div>
        )
    }
}

export default VipCenter
