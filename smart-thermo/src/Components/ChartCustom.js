import React, { Component } from 'react';
import { ResponsiveLine} from '@nivo/line';
import '../Css/line.css'; 
import HeaderBar from './HeaderBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, FormGroup, FormLabel, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'time',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'temperature',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

class ChartCustom extends Component{

    constructor(props){
        super(props);
        this.state = {
            day : new Date().getDate(),
            month : new Date().getMonth() + 1, //month starts from 0
            year : new Date().getFullYear(),
            isLoaded: false,
            temperatures: [],
            id: 0,
            redirect: false,
            data: [],
        }
    }
    
    componentDidMount() {
        var day = new Date().getDate(); 
        var month = new Date().getMonth() + 1; //month starts from 0
        var year = new Date().getFullYear();
        var url="http://smart-thermo.cfapps.io/avarage_temperature/" + String(day) + "/" + String(month) + "/" + String(year);
        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(url)
                this.setState({
                    isLoaded: true,
                    temperatures: response,
                })
            })
    }

    handleDayChange(e){
        this.setState({
            day: e.target.value
        });
    }

    handleMonthChange(e){
        this.setState({
            month: e.target.value
        });
    }

    handleYearChange(e){
        this.setState({
            year: e.target.value
        });
    }

    handleSubmit (event) {

        event.preventDefault();
        this.setState({submitted: true});
        console.log(this.state);

        var url="http://smart-thermo.cfapps.io/avarage_temperature/" + String(this.state.day) + "/" + String(this.state.month) + "/" + String(this.state.year);
        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(url)
                console.log(response)
                this.setState({
                    isLoaded: true,
                    temperatures: response,
                })
            })


    }

    render() {
        var { temperatures} = this.state;

        let data2 = [
            {
              "id": "temp",
              "color": "hsl(336, 70%, 50%)",
              "data": temperatures
            }
    ]

        return(
                <div className="lineContainer">
                    <MyResponsiveLine data={data2}/>
                    <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Day</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="day" 
                        onChange={this.handleDayChange.bind(this)}
                        value={this.state.day}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Month</Form.Label>
                        <Form.Control 
                        type="text"
                        name="month"
                        onChange={this.handleMonthChange.bind(this)}
                        value={this.state.month}
                         />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                        type="text"
                        name="year"
                        onChange={this.handleYearChange.bind(this)}
                        value={this.state.year}
                         />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit.bind(this)}>Select</Button>
                </Form>
                </div>
        )
    }
}

export default ChartCustom;