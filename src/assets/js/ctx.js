import React from 'react'

//创建一个上下文对象
const ctx = React.createContext()

//每个上下文对象都有一个Provider组件和一个Consumer组件
const {Provider,Consumer} = ctx

//导出Provider组件和Consumer组件
export {
    Provider,
    Consumer
}

//导出整个上下文对象
export default ctx