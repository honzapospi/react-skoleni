import React, {Component} from 'react';
import api from '../api';

export default class RemindList extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount(){
        api.getNoticeList().then((result) => {
            this.setState({
                items: result.data.data
            });
        });
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
        );
    }

    renderBody(){
        if(!this.state.items.length){
            return (
                <tr>
                    <td colSpan="2">loading...</td>
                </tr>
            );
        } else {
            return this.state.items.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>
                            <a href="">Delete</a>
                            <a href="">Edit</a>
                        </td>
                    </tr>
                );
            });
        }
    }
}