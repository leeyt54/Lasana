import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

import { showTaskModal } from "../../actions/navActions";

const actions = {
  showTaskModal
};

class Task extends Component {
  handleClick = () => {
    const { showTaskModal, _id, name, description, dueDate } = this.props;

    showTaskModal({ _id, name, description, dueDate });
  };

  render() {
    const { name } = this.props;

    return (
      <Fragment>
        <Card
          style={{ height: "80px", color: "#000" }}
          onClick={this.handleClick}
        >
          <Card.Content>{name}</Card.Content>
        </Card>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Task);