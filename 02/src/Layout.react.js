import React, {Component} from 'react';
import Menu from './menu/Menu.react';
import Content from './content/Content.react';
import Footer from './footer/Footer.react';

export default class Layout extends Component {
    render(){
        return (
        <div>
            <Menu />
            <Content />
            <Footer />
        </div>
        )
    }
}