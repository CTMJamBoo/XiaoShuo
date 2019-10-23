import React,{Component,lazy,Suspense} from 'react' // 与懒加载相关的内置组件
import {withRouter} from 'react-router-dom' // 与路由相关的内置组件

/*
    高阶组件不是React里面的内置组件，它是一种设计思想

    定义一个函数，传入的参数是一个组件，在这个函数中对传入的组件进行各种处理，最后导出处理之后的组件
*/
function checkToken(OldComponent){
    // 定义一个新组件，它是原组件处理之后的结果
    class NewComponent extends Component {
        constructor(){
            super()
    
            this.state = {
                token: ''
            }
        }        

        render(){
            // console.log('hoc render')
            const {token} = this.state

            return (<>
                {/* 
                    新组件的内容，是在原组件的基础上，添加了一些逻辑，注入了一些数据
                    使用高阶组件的目的，就是对原组件进行装饰，变成一个高级的组件
                    原组件本身的props会没了，所以必须向原组件中注入当前组件的props
                */}
                {token && <OldComponent {...this.props} token={token} />}
            </>)
        }

        componentDidMount(){
            // 获取localStorage中的token
            const token = localStorage.getItem('token')
    
            // 如果token存在，就把它存到当前组件的state，如果不存在就跳转到登录界面 
            if(token){
                this.setState({
                    token
                })
            }else{
                this.props.history.push('/login')
            }
        }        
    }

    return NewComponent
}


// 定义一个函数，参数是需要被懒加载的组件
function lazyLoad(OldComponent){
    // 定义一个新组件
   function NewComponent(){
        // 使用lazy组件，将传入的组件包装成懒加载组件
        const LazyComponent = lazy(OldComponent)      

        // 使用withRouter组件，注入路由的配置信息
        const LazyRouteComponent = withRouter(LazyComponent)

        return (
            // 使用Suspense组件，为懒加载提供loading样式
            <Suspense fallback={<div style={{
                textAlign: 'center',
                fontSize: '0.3rem'
            }}>
                正在加载中....
            </div>}>
                <LazyRouteComponent />
            </Suspense>
        )
    }

    // 导出这个新组件
    return NewComponent
}

// 导出这些函数
export {
    checkToken,
    lazyLoad
}