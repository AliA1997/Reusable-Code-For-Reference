import moment from 'moment';
import React, { Component } from 'react';
import { Container, Row, Col, Tooltip } from 'reactstrap';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon/info';
import { connect } from 'react-redux';
import { selectEvent, unselectEvent, editEvent } from '../../redux/actions/eventActions';
import EventItem from './EventItem';
import EventItemModal from './EventItemModal';

class CalendarDateInfo extends Component {
    constructor() {
        super();
        this.state = {
            isTooltipOpen: false,
            isEventModalOpen: false,
            events: [
                {
                    id: 1,
                    description: "Austin's Birthday",
                    eventTime: "2021-07-29 00:30:23.168979",
                    recurringInd: false,
                    lkEventTypeId: 5,
                    lkEventStatusId: 1
                },
                {
                    id: 2,
                    description: "Jill's Birthday",
                    eventTime: "2021-07-29 00:30:23.168979",
                    recurringInd: false,
                    lkEventTypeId: 5,
                    lkEventStatusId: 2
                },
                {
                    id: 1,
                    description: "Cory's Birthday",
                    eventTime: "2021-07-29 00:30:23.168979",
                    recurringInd: false,
                    lkEventTypeId: 5,
                    lkEventStatusId: 3
                },
                {
                    id: 2,
                    description: "Troy's Birthday",
                    eventTime: "2021-07-29 00:30:23.168979",
                    recurringInd: false,
                    lkEventTypeId: 5,
                    lkEventStatusId: 4
                }
            ]
        };
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleSelectEvent = this.toggleSelectEvent.bind(this);
    }

    componentDidMount() {}

    toggleTooltip() {
        this.setState(prevState => ({ isTooltipOpen: !prevState.isTooltipOpen }));
    }

    toggleSelectEvent(event={}, closeModal) {
        const { dispatch, selectedEvent } = this.props;
        const { isEventModalOpen } = this.state;
        if(JSON.stringify(event) !== JSON.stringify(selectedEvent) && !isEventModalOpen) dispatch(selectEvent(event));
        else dispatch(unselectEvent());
        this.setState(prevState => ({isEventModalOpen: closeModal ? false : !prevState.isEventModalOpen}));
    }

    render() {
        const { date } = this.props;
        const { events, isTooltipOpen, isEventModalOpen } = this.state;
        return (
            <Container className="calendar-date-info-container">
                <header>
                    <h4>
                        {moment(date).format('MMMM Do YYYY')} Events
                    </h4>
                    <span href="#" id="info" style={{marginLeft: '10px'}}>
                        <Icon icon={info} size={17.5} />
                    </span>
                    <Tooltip placement="right" isOpen={isTooltipOpen} autohide={false} target="info" toggle={this.toggleTooltip}>
                        <Container className="legend-container">
                            <Row className="legend-header">
                                <h6>Color Legend for Events</h6>
                            </Row>
                            <Row sm="2">
                                <span className="legend visited"></span>
                                <p> Visited</p>
                            </Row>
                            <Row sm="2">
                                <span className="legend not-visited"></span> 
                                <p>Not Visited</p>
                            </Row>
                            <Row sm="2">
                                <span className="legend cancelled"></span>
                                <p>Cancelled</p>
                            </Row>
                            <Row sm="2">
                                <span className="legend neglected"></span>
                                <p>Neglected</p>
                            </Row>
                        </Container>
                    </Tooltip>
                </header>
                {
                    events && events.length
                    ? events.map(event => <EventItem key={event.id} {...event} onClick={this.toggleSelectEvent} />)
                    : <p>No events at this date.</p>
                }
                <EventItemModal
                    openModal={isEventModalOpen}
                    toggleModal={this.toggleSelectEvent}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    selectedEvent: state.event.selectedEvent,
    events: state.event.events
});

export default connect(mapStateToProps)(CalendarDateInfo);