import React, { Component } from 'react';
import CardList from "./CardList";
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));

    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value});
    };

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ?
            <h1 className={'tc'}>Loading</h1> :

            (
                <div className={'tc'}>
                    <h1 className={'f1'}>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>

            );

    }
}

export default App;