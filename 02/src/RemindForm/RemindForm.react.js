import React from 'react';

export default class RemindForm extends React.Component {
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