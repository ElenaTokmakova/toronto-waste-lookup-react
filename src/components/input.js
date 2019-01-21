import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UserInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-wrapper">
                <Container className="form-layout-wrapper">
                    <div className="search-input-wrapper">
                        <div className="form-input">
                        <Form onSubmit={this.props.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="textInput"
                                    value={this.props.input}
                                    onChange={this.props.handleChange}
                                />
                            </FormGroup>
                        </Form>
                        </div>
                    </div>
                    <div className="search-icon-wrapper">
                        <a onClick={this.props.handleSubmit} className="form-icon">
                            <FontAwesome name="search" className="fa fa-fw fa-search fa-flip-horizontal"/>
                        </a>
                    </div>
                </Container>
            </div>
          );
    }

}

export default UserInput;