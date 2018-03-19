import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Label } from 'react-bootstrap';

const SuggestionApprovingForm = (props) => {
    return (
            <Row>
                <Col sm={9}>
                    {props.isApproved && <Label>Approved</Label>}
                    {props.children}
                </Col>
                <Col sm={3}>
                    <Button
                        block
                        bsStyle="success"
                        type="submit"
                        disabled={props.isDisabled}
                        onClick={props.approveHandler}
                    >
                        APPROVE
                    </Button>
                </Col>
            </Row>
    );
};

SuggestionApprovingForm.propTypes = {
    children: PropTypes.object.isRequired,
    isApproved: PropTypes.bool,
    isDisabled: PropTypes.bool.isRequired,
    approveHandler: PropTypes.func,
};

export default SuggestionApprovingForm;
