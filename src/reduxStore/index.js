/*
    state：表示仓库中的状态参数，在reducers.js文件中定义
    actionCreator：表示action的创建函数，在actionCreators.js文件中定义
    reducer:表示action的执行函数，在reducer.js文件中定义
    component view:表示组件视图，当state发生改变，与之相关的组件视图就会自动更新
*/

import {createStore,combineReducers,applyMiddleware} from 'redux' //reudx中的方法
import {counterReducer} from './reducers'//所有的reducer函数
import thunk from 'redux-thunk'//异步操作处理插件

//使用combineReducers，将所有的reducer函数组合成一个总的reducer函数
const rootReducer = combineReducers({
    counter:counterReducer
})

//基于这个总的reducer函数，结合各种插件，生成一个仓库对象
const store = createStore(rootReducer,applyMiddleware(thunk))

//导出这个仓库对象
export default store