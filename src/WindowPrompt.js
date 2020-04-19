import React, { Component } from 'react';
import {Button } from "shards-react";

export default class WindowPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: true}
	}

    updateDisplay = () => {
        this.setState({visible: !this.state.visible})
    }
    render() {
    
        return (
            <div data-visible={this.state.visible} className="d-flex d-sm-none window-prompt align-items-center justify-content-center">
                <div className="flex-column text-center">
                <h2 className="logo text-white">
                    TCO-kalkylatorn
                </h2>
                <h4 className="my-5 text-white text-left">
                    Hemsidan är inte fullt anpassad för mindre enheter. Använd gärna en laptop eller en stationär dator istället. 
                </h4>
                <h5 className="mb-3 text-white"><strong>Vill du fortsätta ändå?</strong></h5>
                <Button onClick={this.updateDisplay} pill theme="light" size="lg">Gå vidare</Button>
                </div>
                
            </div>
        )
    }
}
