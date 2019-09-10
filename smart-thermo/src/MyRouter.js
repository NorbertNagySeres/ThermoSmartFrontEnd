import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chart from './Components/Chart.js';
import Chart24 from './Components/Chart24.js';
import Home from './Components/Home.js';
import Program from './Components/Program.js';
import ProgramDetails from './Components/ProgramDetails.js';
import ChartCustom from './Components/ChartCustom.js';

class MyRouter extends Component {

    render() {
        return(
            <div>
                <Router>
                    <Route path="/" component = {Home} />
                    <Route path="/chart" component = {Chart} />
                    <Route path="/chart24" component = {Chart24} />
                    <Route path="/program" component = {Program} />
                    <Route path="/program/:name" component = {ProgramDetails} />
                    <Route path="/chart_custom" component = {ChartCustom} />
                </Router>
            </div>
        )
    }
}
export default MyRouter;