import React, { Component } from "react";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
} from "reactstrap";
import { FormBuilder, FieldGroup, Validators } from "react-reactive-form";
import { connect } from "react-redux";
import {
  editEvent,
  unEditEvent,
  unselectEvent,
} from "../../redux/actions/eventActions";
import moment from "moment";
import _ from "lodash";
import {
  EventStatusConstants,
  EventTypeConstants,
} from "../../constants/events";

class EventItemModal extends Component {
  constructor() {
    super();
    this.state = {
      isInvalid: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  updateEventForm = FormBuilder.group({
    description: ["", Validators.required],
    eventTime: ["", Validators.required],
    lkEventStatusId: ["", Validators.required],
    lkEventTypeId: ["", Validators.required],
  });

  editEvent() {
    const { dispatch, selectedEvent } = this.props;
    dispatch(editEvent(selectedEvent));
  }

  handleReset() {
    const { dispatch } = this.props;
    this.updateEventForm.reset();
    dispatch(unEditEvent());
  }

  updateEvent(e) {
    e.preventDefault();
  }

  closeModal(e) {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({}, true);
  }

  render() {
    const { selectedEvent, eventToUpdate, openModal, toggleModal } = this.props;
    const showUpdateFunctionality = JSON.stringify(eventToUpdate) !== "{}";
    return (
      <Modal isOpen={openModal} toggle={toggleModal}>
        <form onSubmit={this.updateEvent}>
          <ModalHeader toggle={this.closeModal}>
            <p>Event Details</p>
          </ModalHeader>
          <ModalBody>
            {showUpdateFunctionality ? (
              <FieldGroup
                control={this.updateEventForm}
                render={({ _, invalid }) => <div />}
              />
            ) : (
              <React.Fragment>
                <Container>
                  <Row sm="2">
                    <Col>
                      <p>Event Description:</p>
                    </Col>
                    <Col>
                      <p>{selectedEvent.description}</p>
                    </Col>
                  </Row>
                  <Row sm="2">
                    <Col>
                      <p>Event Time:</p>
                    </Col>
                    <Col>
                      <p>
                        {moment(selectedEvent.eventTime).format(
                          "MMMM Do YYYY at LT"
                        )}
                      </p>
                    </Col>
                  </Row>
                  <Row sm="2">
                    <Col>
                      <p>Date event was created:</p>
                    </Col>
                    <Col>
                      <p>
                        {moment(selectedEvent.createdDatetime).format(
                          "MMMM Do YYYY at LT"
                        )}
                      </p>
                    </Col>
                  </Row>
                  <Row sm="2">
                    <Col>
                      <p>User who created event:</p>
                    </Col>
                    <Col>
                      <p>{selectedEvent.createdBy}</p>
                    </Col>
                  </Row>
                  <Row sm="2">
                    <Col>
                      <p>Type of Event:</p>
                    </Col>
                    <Col>
                      <p>
                        {selectedEvent.lkEventTypeId &&
                          EventTypeConstants[
                            selectedEvent.lkEventTypeId.toString()
                          ]}
                      </p>
                    </Col>
                  </Row>
                  <Row sm="2">
                    <Col>
                      <p>Status of Event:</p>
                    </Col>
                    <Col>
                      <p>
                        {selectedEvent.lkEventStatusId &&
                          EventStatusConstants[
                            selectedEvent.lkEventStatusId.toString()
                          ]}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </React.Fragment>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.closeModal}
              hidden={showUpdateFunctionality}
            >
              Close
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.handleReset}
              hidden={!showUpdateFunctionality}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              hidden={!showUpdateFunctionality}
            >
              Update
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.editEvent}
              hidden={showUpdateFunctionality}
            >
              Edit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  eventToUpdate: state.event.eventToUpdate,
  selectedEvent: state.event.selectedEvent,
});

export default connect(mapStateToProps)(EventItemModal);
