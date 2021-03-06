import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Popup,
  TextArea,
  Loader,
  Dimmer
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

import { connect } from "react-redux";
import { updateTask, updateTaskStatus } from "../../actions/taskActions";
import { hideTaskModal } from "../../actions/navActions";

import Subtasks from "../subtasks/Subtasks";

const actions = {
  updateTask,
  updateTaskStatus,
  hideTaskModal
};

class TaskModal extends Component {
  state = {
    _id: "",
    name: "",
    dueDate: undefined,
    description: "",
    isCompleted: false,
    loading: false,
    showSubtaskInput: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      const {
        tasks: {
          activeTask: { _id, name, description, dueDate, isCompleted }
        }
      } = nextProps;

      this.setState({ _id, name, description, dueDate, isCompleted });
    }
  }

  toggleSubtaskInput = () => {
    this.setState(prevState => ({
      showSubtaskInput: !prevState.showSubtaskInput
    }));
  };

  handleUpdateStatus = async () => {
    this.setState({ loading: true });
    await this.props.updateTaskStatus(this.state._id);
    this.setState({ loading: false });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleDayChange = day => {
    this.props.updateTask(this.state._id, { dueDate: day });
  };

  handleBlur = ({ target: { name } }) => {
    this.props.updateTask(this.state._id, { [name]: this.state[name] });
  };

  renderContent = () => {
    const {
      tasks: {
        activeTask: { subtasks },
        activeTaskLoading
      }
    } = this.props;
    const {
      _id,
      name,
      dueDate,
      description,
      isCompleted,
      loading,
      showSubtaskInput
    } = this.state;

    return !activeTaskLoading ? (
      <Fragment>
        <Modal.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {isCompleted ? (
            <Button
              positive
              onClick={this.handleUpdateStatus}
              style={{ border: 0 }}
              loading={loading}
            >
              <Icon name="check" />
              Completed
            </Button>
          ) : (
            <Button
              basic
              onClick={this.handleUpdateStatus}
              style={{ border: 0 }}
              loading={loading}
            >
              <Icon name="check" /> Mark Complete
            </Button>
          )}

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button.Group basic size="tiny">
              <Popup
                trigger={
                  <Button icon="list" onClick={this.toggleSubtaskInput} />
                }
                content="Add subtask"
              />
              <Popup
                trigger={<Button icon="close" onClick={hideTaskModal} />}
                content="Close"
              />
            </Button.Group>
          </div>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                name="name"
                type="text"
                fluid
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={name}
                size="big"
                placeholder="Write a task name"
                style={{ marginBottom: "10px" }}
              />
            </Form.Field>

            <Form.Field>
              <label>Due Date</label>
              <DayPickerInput
                formatDate={formatDate}
                placeholder="Due Date"
                value={moment(dueDate).format("MM/DD/YYYY")}
                onDayChange={this.handleDayChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <TextArea
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={description}
                style={{ flex: "1" }}
              />
            </Form.Field>
          </Form>

          <Subtasks
            taskId={_id}
            showSubtaskInput={showSubtaskInput}
            subtasks={subtasks}
            toggleSubtaskInput={this.toggleSubtaskInput}
          />
        </Modal.Content>
      </Fragment>
    ) : (
      <Dimmer inverted active style={{ height: "25rem" }}>
        <Loader />
      </Dimmer>
    );
  };

  render() {
    const { nav, hideTaskModal } = this.props;

    return (
      <Modal
        open={nav.taskModal}
        onClose={hideTaskModal}
        size="tiny"
        centered={false}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

const mapState = state => ({
  tasks: state.tasks,
  nav: state.nav
});

export default withRouter(
  connect(
    mapState,
    actions
  )(TaskModal)
);
