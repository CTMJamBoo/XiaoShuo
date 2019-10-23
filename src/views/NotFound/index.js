import React, { Component } from 'react'
import styles from './index.module.scss'

export class NotFound extends Component {
    render() {
        return (
            <div className={styles.notFound}>
                <img src={require('@/assets/img/loading.gif')} alt=""/>
            </div>
        )
    }
}

export default NotFound
