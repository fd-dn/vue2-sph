//Vue的插件必须暴露一个对象并且暴露一个install
let myPlugin = {};
//接受到的参数(Vue原型对象，传过来的数据)
myPlugin.install = function(Vue,data){
    console.log('插件',data);
    //注册全局指令
    Vue.directive(data.name,(element,params)=>{  //参数(组件实例，该自定义指令)
        //自定义插件创建一个全局指令让英文变成大写
        element.innerHTML = params.value.toUpperCase();
        console.log(element,params);
    })
}
export default myPlugin;