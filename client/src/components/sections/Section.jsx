import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dropdown, Header, Input, Button, Card } from "semantic-ui-react";

import { updateSection, deleteSection } from "../../actions/sectionActions";

const actions = {
  updateSection,
  deleteSection
};

class Section extends Component {
  state = {
    editing: false,
    input: "",
    loading: false
  };

  componentDidMount() {
    this.setState({ input: this.props.name });
  }

  handleClick = (e, { value }) => {
    if (value === "update") this.setState({ editing: true });
    if (value === "delete") this.props.deleteSection(this.props.id);
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  updateSection = async value => {
    this.setState({ loading: true });
    await this.props.updateSection(this.props.id, { name: value });
    this.setState({ editing: false, loading: false });
  };

  handleOnBlur = async ({ target: { value } }) => {
    this.updateSection(value);
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === "Enter" && value.trim() !== "") {
      // add new section
      this.updateSection(value);
    }
  };

  render() {
    const { editing, input, loading } = this.state;
    const { name } = this.props;

    return (
      <div style={{ padding: "0 10px" }}>
        <div className="section" style={{ padding: "10px 0" }}>
          {editing ? (
            <Input
              autoFocus
              loading={loading}
              onBlur={this.handleOnBlur}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={input}
            />
          ) : (
            <Fragment>
              <Header as="h3" style={{ marginBottom: 0 }}>
                {name}
              </Header>
              <Dropdown
                style={{ color: "grey", padding: "0 2px" }}
                icon="angle down"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    value="update"
                    text="Rename Column"
                    onClick={this.handleClick}
                  />
                  <Dropdown.Item
                    value="delete"
                    text="Delete Column"
                    onClick={this.handleClick}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Fragment>
          )}
        </div>
        <Card style={{ margin: 0 }}>
          <Button icon="add" fluid size="tiny" basic />
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Section);