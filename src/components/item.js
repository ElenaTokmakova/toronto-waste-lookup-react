import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { ListGroupItem } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

class Item extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {title, body, index, favourited} = this.props.details;

        const parser = new DOMParser;
        const dom = parser.parseFromString('<!doctype html><body>' + body, 'text/html');
        const decodedBody = dom.body.textContent;

        return (
            <Row className="garbage-item">
                <Col sm="5" xs="12"><FontAwesome name="star" className={"fa fa-fw fa-search " + ( favourited ? 'favourited' : '')}
                    onClick={this.props.handleFavouriteStatusChange.bind(this, index)} />{title}</Col>
                <Col sm="7" xs="12">{renderHTML(decodedBody)}</Col>
            </Row>
          );
    }

}

export default Item;