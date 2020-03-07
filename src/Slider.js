import React from "react";
import { Slider } from "shards-react";

export default class SliderCustomRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleSlide = (e) => {
    this.setState({
      value: parseFloat(e[0])
    });
  }

  render() {
    return (
      <div>
        <p>{this.props.icon} {this.props.title}: {this.state.value}{this.props.unit}</p>
        <Slider
          
          onSlide={this.handleSlide}
          connect={[true, false]}
          start={[this.state.value]}
          range={{ min: this.props.min, max: this.props.max}}
        />
      </div>
    );
  }
}