import React from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import './index.scss'
import classnames from 'classnames'

function FooterNav(props) {
    //复用组件的props不包含路由信息，需要手动往组件中注入路由信息
    //获取当前路由的路径
    // console.log(props)
    const pathname = props.location.pathname

    //只有当路由路径为读书、找书、vip、个人中心时，才显示底部导航
    const showNav = /home|lookBook|vipCenter|myCenter/.test(pathname)


    return (
        //使用fragment组件或者空标签，包装jsx代码，本身不会被渲染成真实的DOM节点
        <>
        {/* 条件渲染 */}
        {
            showNav &&
            <div className='nav'>
                <NavLink className='item' to='/lookBook'>
                    <i className={classnames('iconfont','icon-ziyuan')}></i>
                    <p>读书</p>
                </NavLink>
                <NavLink className='item' to='/home'>
                    <i className={classnames('iconfont','icon-book')}></i>
                    <p>找书</p>
                </NavLink>
                <NavLink className='item' to='/vipCenter'>
                    <i className={classnames('iconfont','icon-vip')}></i>
                    <p>VIP</p>
                </NavLink>
                <NavLink className='item' to='/myCenter'>
                    <i className={classnames('iconfont','icon-tuanduicankaoxian-')}></i>
                    <p>我的</p>
                </NavLink>
            </div>
        }

        
        </>
    )
}
//使用withRouter组件，向当前组件注入路由信息
export default withRouter(FooterNav)
