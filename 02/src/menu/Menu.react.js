import React, {Component} from 'react';



export default class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: 1,
            items: [
                {id: 1, name: 'Home'},
                {id: 2, name: 'About us'},
                {id: 3, name: 'Contact'}
            ]
        };
    }

    render(){
        return (<ul>{this.renderItems()}</ul>)
    }

    renderItems(){
        return this.state.items.map((item) => {
            var cname = this.state.active == item.id ? 'active' : 'noactive';
            return (<li onClick={() => {
                this.handleOnClickItem(item.id)
            }} className={cname} key={item.id}>{item.name}</li>);
        });
    }

    handleOnClickItem(id){
        this.setState({
            active: id
        });
    }
}