class App extends React.Component {
    render(){
        return(
            <div>
                <Menu items={this.props.items} />
            </div>
        )
    }
}

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: 1
        };
    }

    render(){
        return <ul>
            {this.renderItems()}
        </ul>
    }

    handleClick(id){
        this.setState({
            active: id
        });
    }

    renderItems(){
        return this.props.items.map((item) => {
            var cssClass = item.id == this.state.active ? 'active' : 'n';
            return <li className={cssClass} key={item.id} onClick={() => this.handleClick(item.id)}>{item.name}</li>
        });
    }
}

class MenuItem extends React.Component {
    render(){
        var cssClass = this.props.isActive ? 'active' : 'neactive'
        return <li className={cssClass} onClick={this.handleClick.bind(this)}>{this.props.name}</li>
    }

    handleClick(){
        this.props.onClick(this.props.id);
    }
}


const items = [
    {name: 'Home', id: 1},
    {name: 'About us', id: 2},
    {name: 'Contact', id: 3},
];

ReactDOM.render(<App items={items} /> , document.getElementById('app'));



