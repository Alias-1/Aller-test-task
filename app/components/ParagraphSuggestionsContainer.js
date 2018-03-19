import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Row, Col, ListGroup,  } from 'react-bootstrap';

const ParagraphSuggestionsContainer = (props) => {
    return (
        <Panel>
            <Panel.Heading>
                <Panel.Title>
                    <Row>
                        <Col sm={10} xs={9}>
                            <b>Original text:</b>
                        </Col>
                        <Col sm={2} xs={3}>
                            <Button
                                className="pull-right"
                                bsStyle="danger"
                                type="button"
                                onClick={props.deleteHandler}
                            >
                                DELETE
                            </Button>
                        </Col>
                    </Row><br/>
                    <p>{props.originalText}</p>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <p><b>User suggestions:</b></p>
                <ListGroup>
                    {props.children}
                </ListGroup>
            </Panel.Body>
        </Panel>
    );
};

ParagraphSuggestionsContainer.propTypes = {
    originalText: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default ParagraphSuggestionsContainer;
