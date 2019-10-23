import React, { Component } from 'react'
import {Provider} from '@/assets/js/ctx' //引入Provider组件
import axios from '@/assets/js/axios'//配置好的axios

export class MyGlobal extends Component {
    constructor(){
        super()

        this.state={
            axios,
        }
    }
   
    render() {
        const {axios} = this.state
        return (
           /*
                使用Provider组件，给子组件注入数据，数据存放在value属性中
                这里的子组件就是整个项目的组件，所以这里提供的数据，每个组件都能获取
            */
           <Provider value={{
               axios
           }}>
               {this.props.children}
           </Provider>
        )
    }
}

export default MyGlobal
