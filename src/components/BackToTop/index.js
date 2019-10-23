import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export class BackToTop extends Component {
    //设置props的默认值
    static  defaultProps = {
        scrollObj:window
    }
    //设置props的类型
    static propTypes = {
        scrollObj:PropTypes.object
    }
    //定位坐标，它会根据滚动对象的不同而不同
    get pos(){
        const scrollObj = this.props.scrollObj

        if(scrollObj == window){
            return {
                right:'0.4rem',
                bottom:'1rem'
            }
        }else{
            //获取滚动对象的右边框距离窗口左边的距离，
            //获取滚动对象的下边框距离窗口上边的距离
            const {right,bottom} = scrollObj.getBoundingClientRect()

            //计算得到字体图标的坐标
            return {
                right:`calc(100vw - ${right}px + 0.4rem)`,
                bottom:`calc(100vh - ${bottom}px + 1rem)`
            }
        }
    }

    constructor(){
        super()

        this.state = {
            isBack: false
        }
    }

    backToTop = () => {
        this.props.scrollObj.scrollTo(0,0)
    }

    render() {
        const {isBack} = this.state
        const {backToTop,pos} = this
        return (
            <i style={{display: isBack ? 'inline-block' : 'none',
                        right:pos.right,
                        bottom:pos.bottom
        }} className={classnames('iconfont','icon-huidaodingbu',styles.backToTop)} onClick={backToTop} />
        )
    }

    componentDidMount(){
            //获取传入的滚动对象
            const scrollObj = this.props.scrollObj

            //监听滚动事件
            scrollObj.addEventListener('scroll',()=>{
                const scrollTop = scrollObj == window ? (document.body.scrollTop || document.documentElement.scrollTop) : scrollObj.scrollTop

                this.setState({
                    isBack: scrollTop > 500
                }) 
            },false)

            if(scrollObj!=window){
                window.addEventListener('scroll',()=>{
                    this.setState({
                        num:0
                    })
                },false)
            }
          
    }
}

export default BackToTop
