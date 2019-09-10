import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import {Form, FormGroup, FormLabel, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

class ProgramDetails extends Component {

    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            minTemp: 0.0,
            maxTemp: 0.0,
            isCurrent : false,
            program: [],
            submitted: false,
            redirect: false
        }
        this.bodyToReturn = {
            id: "",
            name: "",
            minTemp: 0.0,
            maxTemp: 0.0,
            isCurrent : false
        }
    }

    componentDidMount() {
        var url="http://smart-thermo.cfapps.io/program_details/" + this.props.match.params.name;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    program: json,
                    id : json.id,
                    name: json.name,
                    minTemp : json.minTemp,
                    maxTemp : json.maxTemp,
                    isCurrent : json.isCurrent
                })
            });
    }


    handleUpdate (event) {
        this.bodyToReturn.id = this.state.id;
        this.bodyToReturn.name = this.state.name;
        this.bodyToReturn.minTemp = this.state.minTemp;
        this.bodyToReturn.maxTemp = this.state.maxTemp;
        this.bodyToReturn.isCurrent = this.state.isCurrent;
        event.preventDefault();
        this.setState({submitted: true});
        console.log(this.state);
        var url="http://smart-thermo.cfapps.io/update/";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.bodyToReturn),
        })
            .then(response => {
                console.log(response);
            }).then(error => {
            console.log(error);
        });
    }

    handleSelect (event) {
        this.bodyToReturn.id = this.state.id;
        this.bodyToReturn.name = this.state.name;
        this.bodyToReturn.minTemp = this.state.minTemp;
        this.bodyToReturn.maxTemp = this.state.maxTemp;
        this.bodyToReturn.isCurrent = true;
        event.preventDefault();
        this.setState({submitted: true});
        console.log(this.state);
        var url="http://smart-thermo.cfapps.io/select/";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.bodyToReturn),
        })
            .then(response => {
                console.log(response);
            }).then(error => {
            console.log(error);
        });
    }

    handleMinTempChange(e){
        this.setState({
            minTemp: e.target.value
        });
    }

    handleMaxTempChange(e){
        this.setState({
            maxTemp: e.target.value
        });
    }

    handleSpecializareChange(e){
        this.setState({
            specializare: e.target.value
        });
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/delete_doctor/" + this.props.match.params.id} />
        }
    };

    redirectToAdmin(id){
        this.setState({
            redirect: true
        });

    }
    render() {
        const {submitted, program} = this.state;

        return(

            <div>
                <h2><center>Program {this.props.match.params.name}</center></h2>
                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Min Temp</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="minTemp" 
                        onChange={this.handleMinTempChange.bind(this)}
                        value={this.state.minTemp}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Max Temp</Form.Label>
                        <Form.Control 
                        type="text"
                        name="maxTemp"
                        onChange={this.handleMaxTempChange.bind(this)}
                        value={this.state.maxTemp}
                         />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSelect.bind(this)}>Select</Button>
                    <Button variant="secondary" onClick={this.handleUpdate.bind(this)}>Update</Button>
                </Form>
             {submitted && ( <h3 color="green">Sent</h3> ) }
            </div>
        );
    }
}


export default ProgramDetails;