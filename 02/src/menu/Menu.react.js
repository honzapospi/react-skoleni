import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: 1,
            items: [
                {id: 1, name: 'List', path: '/'},
                {id: 2, name: 'New', path: '/new/'}
            ]
        };
    }

    render(){
        return (<ul>{this.renderItems()}</ul>)
    }

    renderItems(){
        return this.state.items.map((item) => {
            var cname = this.state.active == item.id ? 'active' : 'noactive';
            return (<li key={item.id}><Link to={item.path}>{item.name}</Link></li>);
        });
    }

    handleOnClickItem(id){
        this.setState({
            active: id
        });
    }
}