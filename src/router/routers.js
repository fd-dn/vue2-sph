export default [
         {
            path:"/center",
            component:  () => import('@/pages/Center'),
            //meta配置项 : 路由元信息，路由身上带的信息
            meta:{
            show:true
            },
            children:[
               {
                  path:"/center/gecenter",
                  component:() => import('@/pages/Center/geCenter')
               },
               {
                  path:"/center/tuancenter",
                  component:() => import('@/pages/Center/tuanCenter')
               },
               {
                  path:'/center',
                  redirect:"/center/gecenter"
               }
            ]
         },
         {
            path:"/paysuccess",
            component:() => import('@/pages/PaySuccess'),
            //meta配置项 : 路由元信息，路由身上带的信息
            meta:{
            show:true
            },
            beforeEnter:(to,from,next)=>{
               if(from.path == '/pay'){
                  next();
               }else{
                 next(false);
               }
              }
         },
         {
            path:"/pay",
            component:() => import('@/pages/Pay'),
            //meta配置项 : 路由元信息，路由身上带的信息
            meta:{
            show:true
            },
            beforeEnter:(to,from,next)=>{
               if(from.path == '/trade'){
                  next();
               }else{
                 next(false);
               }
              }
         },
         {
            path:"/trade",
            component:() => import('@/pages/Trade'),
            //meta配置项 : 路由元信息，路由身上带的信息
            meta:{
            show:true
            },
            beforeEnter:(to,from,next)=>{
             if(from.path == '/shopcart'){
                next();
             }else{
               next(false);
             }
            }
         },
        {
           path:"/home",
           component: ()=> import('@/pages/Home'),
           //meta配置项 : 路由元信息，路由身上带的信息
           meta:{
            show:true
           }
        },
        {
            path:"/login",
            component: ()=> import('@/pages/Login'),
            meta:{
               show:false
              }
         },
         {
            path:"/Register",
            component: ()=> import('@/pages/Register'),
            meta:{
               show:false
              }
         },
         {
            path:"/Search/:text?",
            name:'Search',
            component: ()=> import('@/pages/Search'),
            meta:{
               show:true
              }
         },
         {
            path:'/Detail/:skuid',
            name:'Detail',
            component: ()=> import('@/pages/Detail'),
            meta:{
               show:true
            }
         },
         {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component: ()=> import('@/pages/AddCartSuccess'),
            meta:{
               show:true
            }
         },
         {
            path:"/shopcart",
            component: ()=> import('@/pages/ShopCart'),

            //meta配置项 : 路由元信息，路由身上带的信息
            meta:{
             show:true
            }
         },
         //重定向：在项目跑起来的时候，访问/，立马让他跑起来
         {
          path:'*',
          redirect:"/home"
         }
    ]
