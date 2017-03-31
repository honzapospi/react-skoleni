var items = [
    {id: 1, name: 'RemindList'},
    {id: 2, name: 'New Remind'}
];

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: 1
        };
    }

    render(){
        return (<ul>{this.renderItems()}</ul>)
    }

    renderItems(){
        return this.props.items.map((item) => {
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
        this.props.setActiveItem(id);
    }
}

class RemindForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    render(){
        return (
            <form onSubmit={(e) => {e.preventDefault()}}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td><input type="text" ref="name" onChange={this.handleChangeName.bind(this)} value={this.state.name} /></td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td><textarea ref="desc" defaultValue={'text popisu'}></textarea></td>
                        </tr>
                        <tr>
                            <th></th>
                            <td><input type="submit" value="Save" onClick={this.handleSubmit.bind(this)} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }

    handleSubmit(){
        var values = this.state;
        values.description = this.refs.desc.value;
        values.title = values.name;
        values.date = '2017-10-10 10:10:10';
        values.period = 'week';
        $.post('http://skoleni.anywhere.cz/react/remindme/api/notice', values, () => {
            this.props.setId(1)
        });
    }

    handleChangeName(e){
        if(e.target.value.length > 10){
            alert('Name is too long.');
        } else {
            this.setState({
                name: e.target.value
            });
        }
    }
}

class RemindList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount(){
        setTimeout(() => {
            $.getJSON('http://skoleni.anywhere.cz/react/remindme/api/notice/', (response) => {
                this.setState({items: response.data});

            })
        }, 2000);

        var x  = $.getJSON('http://skoleni.anywhere.cz/react/remindme/api/notice/');
        x.than(sfdds);

    }

    render(){
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderBody()}
                </tbody>
            </table>
        )
    }

    renderBody(){
        if(!this.state.items.length){
            return <tr>
                <td colSpan="2">Loading</td>
            </tr>
        } else {
            return this.state.items.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td><a href="">delete</a></td>
                    </tr>
                )
            });
        }
    }

}

class Content extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: 1
        };
    }

    render(){

        if(this.state.active == 1){
            return(
            <div>
                <Menu items={this.props.items} setActiveItem={this.setId.bind(this)} />
                <RemindList />
            </div>
            )
        } else if(this.state.active == 2){
            return <div>
                    <Menu items={this.props.items} setActiveItem={this.setId.bind(this)} />
                    <NewRemindForm name = {'asda'} setId={this.setId.bind(this)} />
                </div>
        }
    }

    setId(id){
        this.setState({
            active: id
        });
    }
}


class App extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>

                <Content items={this.props.items} />
            </div>
        );
    }
}

var title = 'React app';

ReactDOM.render(<App title={title} items={items} />, document.getElementById('app'));