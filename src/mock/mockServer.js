import Mock from 'mockjs';
import banners from './banners.json';
import floors from './floors.json';

//mock数据 : 参数一(请求地址) 参数二(请求数据)
Mock.mock('/mock/banners',{code:200,data:banners});
Mock.mock('/mock/floors',{code:200,data:floors});