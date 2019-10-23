import React, { Component } from 'react'
import store from '@/reduxStore' // 仓库对象
import {changeNum,changeNum_async} from '@/reduxStore/actionCreators' // 与计数器有关的action创建函数

export class index extends Component {
    constructor(){
        super()

        this.state = {
            num: 0,
            num2: 0
        }
    }

    onAdd = () => {
        // 使用action的创建函数，创建一个与改变数字有关的action
        const action = changeNum(this.state.num + 1)

        // 使用仓库对象的dispatch方法，向reducer函数分发这个action
        store.dispatch(action)
    }
    onAdd_async = () => {
        // 使用action的创建函数，创建一个与改变数字有关的action
        const action = changeNum_async(this.state.num + 1)

        // 使用仓库对象的dispatch方法，向reducer函数分发这个action
        store.dispatch(action).then((msg) => {
            console.log(msg)
        })        
    }    

    render() {
        const {num,num2} = this.state
        const {onAdd,onAdd_async} = this

        return (
            <div>
                子组件b，
                <span>变量的值为：{num}</span>，
                <span>变量的值保留两位小数点：{num2}</span><br />
                <button onClick={onAdd}>点击+1</button>，
                <button onClick={onAdd_async}>点击，延迟2秒之后+1</button>
            </div>
        )
    }

    componentDidMount(){
        // 使用仓库对象的getState，获取仓库中整个state
        const state = store.getState()
        // 获取与计数器有关的state，并取出里面的变量和函数
        const {num,num2} = state.counter
        // 初始化当前组件中的state
        this.setState({
            num,
            num2: num2()
        })

        /*
            使用仓库对象的subscribe方法，监听仓库中state的改变
            subscribe的方法结果一个解绑函数
        */
        this.unsubscribe = store.subscribe(() => {
            // 使用仓库对象的getState，再次获取仓库中整个state
            const state = store.getState()
            // 再次获取与计数器有关的state，并取出里面的变量和函数
            const {num,num2} = state.counter
            // 更新当前组件中的state
            this.setState({
                num,
                num2: num2()
            })            
        })
    }

    componentWillUnmount(){
        // 调用解绑函数，解除对仓库的监听 
        this.unsubscribe()
    }
}

export default index
