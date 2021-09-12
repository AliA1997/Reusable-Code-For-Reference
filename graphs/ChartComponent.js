import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import defineChart from './defineChart';
import './Chart.css';
import 'bootstrap';
import $ from 'jquery';

class Chart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            typeOfChart: props.typeOfChart,
            chart: ''
        };
    }

    componentDidMount() {
        const margins = {top: 20, right: 0, bottom: 20, left: 0};
        const { type, dataSet, height, width, label, ticks, barColor } = this.props;   
        console.log('dataSet:', dataSet); 
        const chart = defineChart({ type, dataSet, height, width, label, ticks, barColor, customMargins: margins });
        $('.card-body').append(chart);
        this.setState({ chart });
    }

    render() {
        const { key, type, title } = this.props;
        const { chart } = this.state;
        const svgChart = chart ? chart : null
        console.log("SVG CHART:", svgChart);
        window.scrollTo(0, 0);
        return (
            <Col key={key}  className="bar-chart-body">
                <Card>
                    <CardBody style={{height: '500px'}}>
                        {title}
                    </CardBody>
                </Card>
            </Col>
        );   
    }
}

export default Chart;