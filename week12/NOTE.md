
组件化设计结构

<Component data={data} clickEve={clickEve}>
  <subComponent />
</Component>

function Component(props){
    let[count,setCount] = useState();
    let{data,clickEve} = this.props;
    const fn=()=>{}
}

state 指 count内部不向外暴露
children 指 subComponent组件
attribute 值data
property 指 data
event 指clickEve 暴露给使用者的组件方法
methods 指 fn 组件内部不向外暴露的方法
config  指不会被更改且适用于全局
lifecycle 指组件从创建卸载更新销毁的阶段
