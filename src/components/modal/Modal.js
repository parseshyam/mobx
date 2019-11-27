import { Modal, Button, Input, Checkbox } from 'antd';
import React from 'react';
export default class App extends React.Component {
  state = {
    firstName: this.props.data.firstName,
    lastName: this.props.data.lastName,
    phoneNumber: this.props.data.lastName,
    about: this.props.data.about,
    email: this.props.data.email,
  };

  assignValues = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        confirmLoading: false,
      });
    }, 2000);
  };

  render() {
    console.log(this.state);
    const {
      confirmLoading,
      firstName,
      lastName,
      about,
      phoneNumber,
      email,
    } = this.state;
    const { visible, changeModal, data } = this.props;
    return (
      <div>
        <Modal
          title="Title"
          mask={true}
          maskStyle={{ backgroundColor: 'rgba(255,255,255, 0.3)' }}
          visible={visible}
          onOk={() => changeModal()}
          confirmLoading={confirmLoading}
          onCancel={() => changeModal()}
        >
          <p>{JSON.stringify(data.id)}</p>
          ID :{' '}
          <Input
            name="id"
            placeholder="Basic usage"
            value={data.id}
            onChange={this.assignValues}
          />
          FIRST NAME :{' '}
          <Input
            name="firstName"
            placeholder="Basic usage"
            onChange={this.assignValues}
            value={firstName}
          />
          LAST NAME :{' '}
          <Input
            name="lastName"
            placeholder="Basic usage"
            onChange={this.assignValues}
            value={lastName}
          />
          EMAIL :{' '}
          <Input
            name="email"
            placeholder="Basic usage"
            onChange={this.assignValues}
            value={email}
          />
          PHONE NO :{' '}
          <Input
            value={phoneNumber}
            name="phoneNumber"
            onChange={this.assignValues}
          />
        </Modal>
      </div>
    );
  }
}
