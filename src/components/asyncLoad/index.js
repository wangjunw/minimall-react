import React from 'react';
export default (loadComponent, placeholder = '正在加载中') => {
    return class AsyncComponent extends React.PureComponent {
        constructor() {
            super();
            this.state = {
                Child: null, //要加载的组件
                unmount: false // 组件是否卸载
            };
        }
        componentWillUnmount() {
            this.unmount = true;
        }
        async componentDidMount() {
            // 这里的loadComponent其实就是import('../pages/goodsList')，child就是拿到的组件
            const { default: Child } = await loadComponent();

            if (this.unmount) return;
            this.setState({
                Child
            });
        }
        render() {
            const { Child } = this.state;
            return Child ? <Child {...this.props} /> : placeholder;
        }
    };
};
