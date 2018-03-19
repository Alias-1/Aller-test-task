import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

const SuggestionField = ({input, label, placeholder, meta: {error, warning, visited}}) => (
    <FormGroup controlId={label} validationState={!visited ? null : (error ? 'error' : 'success')}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl
            {...input}
            componentClass="textarea"
            placeholder={placeholder}
        />
        <HelpBlock>
            {visited && ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </HelpBlock>
    </FormGroup>
);

SuggestionField.propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
};

export default SuggestionField;
