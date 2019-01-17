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
                    <Row>
                        <Col xs="12" sm="8" md="10" lg="11">
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
                        </Col>
                        <Col xs="12" sm="4" md="2" lg="1">
                            <a onClick={this.props.handleSubmit} className="form-icon">
                                <FontAwesome name="search" className="fa fa-fw fa-search fa-flip-horizontal"/>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
          );
    }

}

export default UserInput;