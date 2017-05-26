class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 1
        }
    };

    render(){
        return(
            <div>
                <Menu items={this.props.items} setPage={this.handleSetPage.bind(this)} active={this.state.activePage} />
                {this.renderBody()}
            </div>
        )
    }

    handleSetPage(id){
        this.setState({
            activePage: id
        });
    }

    renderBody(){
        if(this.state.activePage == 1)
            return <RemindList />
        else
            return <RemindForm name={'Honza'} setPage={this.handleSetPage.bind(this)} />
    }
}

class Menu extends React.Component {

    render(){
        return <ul>
            {this.renderItems()}
        </ul>
    }

    handleClick(id){
        this.props.setPage(id);
    }

    renderItems(){
        return this.props.items.map((item) => {
            var cssClass = item.id == this.props.active ? 'active' : 'n';
            return <li className={cssClass} key={item.id} onClick={() => this.handleClick(item.id)}>{item.name}</li>
        });
    }
}


class RemindForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            description: 'aaaa',
            date: null
        };
    }

    componentDidMount(){
        var self = this;
        $(this.refs.cal).datepicker({
            onSelect: self.handleOnChangeDate.bind(self)
        });
    }

    handleOnChangeDate(){
          this.setState({
              date: this.refs.cal.value
          });
    };

    render(){
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName.bind(this)} />
                    <input ref="desc" type="text" defaultValue={this.state.description} />
                    <input type="text" ref="cal" />
                    <input type="submit" value='Send' onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        );
    }

    handleSubmit(){
        var data = {
            title: this.state.name,
            description: this.refs.desc.value,
            date: '1019-10-10 10:10:10',
            period: 'week'
        };
        $.post('http://skoleni.anywhere.cz/react/remindme/api/notice/', data, () => {
            this.props.setPage(1);
        });
    }

    handleChangeName(e){
        if(e.target.value.length > 8){
            alert('Name is too long.');
            return;
        }
        this.setState({
            name: e.target.value
        });
    }
}


class RemindList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }

    componentWillMount(){
        let x = new Promise((resolved, reject) => {
            $.getJSON('http://skoleni.anywhere.cz/react/remindme/api/notice/', (result) => {
                this.setState({
                    items: result.data
                });
            });
        })
    }

    render(){
        if(this.state.items.length){
            return <div>
                {this.renderTable()}
            </div>
        } else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }

    renderTable(){
        return <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>period</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {this.renderBody()}
            </tbody>
        </table>
    }

    renderBody(){
        return this.state.items.map(item => {
            return <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.period}</td>
                <td><div onClick={() => this.handleDeletePage(item.id)}>delete</div></td>
            </tr>
        });
    }

    handleDeletePage(id){
        $.delete('http://skoleni.anywhere.cz/react/remindme/api/notice/'+id, (response) => {

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
    {name: 'List', id: 1},
    {name: 'New', id: 2},
];

ReactDOM.render(<App items={items} /> , document.getElementById('app'));



