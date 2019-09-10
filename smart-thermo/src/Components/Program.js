import React, { Component } from 'react';
import {Form, FormGroup, FormLabel, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import '../Css/program.css';

class Program extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            programs: [],
            redirect: false,
            name: ""
        }
    }
    
    componentDidMount() {
        var url="http://smart-thermo.cfapps.io/all_programs";
        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({
                    programs: response,
                })
            })
    }

    selectProgram(name){
        this.setState({
            redirect: true
        });
        this.setState({name: name});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={`/program/${this.state.name}`}/>
        }
    };

    render(){
        var { programs } = this.state;
        return(
            <div>
            <h1><center>Availabe programs</center></h1>
            <div className="display-programs">
                <ListGroup defaultAcitveKey="#link1">
                {programs.map(p => 
                    <ListGroup.Item action href={p.name} onClick={() => this.selectProgram(p.name)}>
                        {p.name}
                    </ListGroup.Item>
                    )}
                    </ListGroup>
            </div>
            {this.renderRedirect()}
            </div>
        );

    }
}

export default Program;