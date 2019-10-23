import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import routes from './routes.js'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import FooterNav from './components/FooterNav'//自定义的导航组件
import MyGlobal from './components/MyGlobal'//自定义的全局组件

function App() {
  return (
    <MyGlobal>
		<HashRouter>
			{/* 使用Switch组件，匹配一个路由就不会再往下匹配 */}
			<Switch>
				{/* 
					使用Redirect组件，当访问路径是from，自动跳转到to
					如果匹配失败，需要添加exact属性实现严格匹配
				*/}
				<Redirect from="/" to="/home" exact />
				{/* 
					使用Route组件，一个路由对应一个Route组件
					使用数组的map方法，实现列表渲染，根据routes这个数组，渲染多个Route组件
					使用对象的扩展运算符，给每个Route组件注入对应的路由配置信息
				*/}
				{routes.map(e => <Route {...e} />)}
			</Switch>
			<FooterNav />
		</HashRouter>
	</MyGlobal>
  )
}

export default App;
