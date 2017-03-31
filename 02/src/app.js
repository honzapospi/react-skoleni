import React from 'react';
import {render} from 'react-dom';
import Layout from './Layout.react';
import {Router, Route, IndexRoute, browserHistory, hashHistory, createMemoryHistory} from 'react-router';
import RemindList from './list/RemindList.react';
import RemindForm from './RemindForm/RemindForm.react';

render(
    <Router history={browserHistory} >
        <Route path='/' component={Layout}>
            <IndexRoute component={RemindList} />
            <Route path="new/" component={RemindForm} />
        </Route>
    </Router>
    , document.getElementById('app'));