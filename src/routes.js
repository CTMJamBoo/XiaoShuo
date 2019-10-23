import Home from './views/Home'
import NotFound from './views/NotFound'
import LookBook from './views/LookBook'
import VipCenter from './views/VipCenter'
import MyCenter from './views/MyCenter'
import Login from './views/Login'
import Register from './views/Register'
import Classify from './views/Classify'
import Search from './views/Search'
import ReadBook from './views/ReadBook'
import Redux from './views/Redux'
// import BookDetail from './views/BookDetail'

import {lazyLoad} from './assets/js/hoc'
import BookList from './views/BookList'
const BookDetail = lazyLoad(()=> import('./views/BookDetail'))

const routes = [
    //home
    {
        path: '/home',
        key: 'home',
        component: Home
    },
     //lookbook
     {
        path: '/lookBook',
        key: 'lookBook',
        component: LookBook
    },
    //redux
    {
        path: '/redux',
        key: 'redux',
        component: Redux
    },
     //vipcenter
     {
        path: '/vipCenter',
        key: 'vipCenter',
        component: VipCenter
    },
     //mycenter
     {
        path: '/myCenter',
        key: 'myCenter',
        component: MyCenter
    },
      //Register
      {
        path: '/register',
        key: 'register',
        component: Register
    },
       //Login
       {
        path: '/login',
        key: 'login',
        component: Login
    },
    //classify
    {
        path: '/classify',
        key: 'classify',
        component: Classify
    },
    //bookDetail
    {
        path: '/bookDetail/:bookname/:author',
        key: 'bookDetail',
        component: BookDetail
    },
    //search
    {
        path: '/search',
        key: 'search',
        component: Search
    },
    //readBook
    {
        path: '/readBook/:bookname/:author',
        key: 'readBook',
        component: ReadBook
    },
    //bookList
    {
        path: '/bookList',
        key: 'bookList',
        component: BookList
    },
    //404
    {
        path: '',
        key: 'notFound',
        component: NotFound
    }
]

export default routes