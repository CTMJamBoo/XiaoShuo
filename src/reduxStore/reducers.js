/*
    state表示状态参数，可以有多个state，每个state是一个json对象
*/

//定义一个与计数器有关的state
const counterState = {
    num:100,
    num2(){
        return counterState.num.toFixed(2)
    }
}

/*
    action创建完了，就要执行它，执行的方式就是通过调用reducer函数
    这个函数的第一个参数是state，第二个参数是action
*/

//定义一个与计数器有关的reducer
function counterReducer(state = counterState,action){
    //获取action的类型和内容
    const {type,payload} = action 

    //判断action的类型
    switch(type){
        case 'changeNum':
            //获取外部传入的参数，改变state
            state.num = payload
            //返回改变之后的state
            return state 
        default:
            //返回没有改变的state
            return state 
    }
}

//导出所有的reducer函数
export{
    counterReducer
}