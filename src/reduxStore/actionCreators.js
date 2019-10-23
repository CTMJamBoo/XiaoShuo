/*
    如果要改变仓库中的state，就要执行一次action
    执行action之前，要先定义action
    如果要定义action，就要使用action的创建函数
    这个函数的参数是改变state时的外部参数
    函数的返回值是一个action，格式是一个json对象，type属性表示action的类型，payload表示action的内容

*/

//定义一个与计数器相关的action创建函数
function changeNum(newVal){
    return {
        type:'changeNum',
        payload:newVal
    }
}

//定义一个与计数器相关的action创建函数，包含异步操作
function changeNum_async(newVal){
    /*
        返回的action，不再是一个json对象，而是一个回调函数
        回调函数的参数是dispatch方法
        在这个回调函数中，写异步操作
        为了知道这个异步操作什么时候结束，需要使用promise对这个异步操作进行封装，得到一个promise对象
        最后要把这个promise对象，作为函数的返回值导出去
    */
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const action = changeNum(newVal)
                dispatch(action)

                resolve('异步操作执行完毕')
            },2000)
        })
    }

}

//导出
export {
    changeNum,changeNum_async
}