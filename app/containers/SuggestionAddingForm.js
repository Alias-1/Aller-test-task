import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {addUserSuggestionToBackEnd} from '../actions/index';
import FormContainer from './FormContainer';
import SuggestionField from '../components/SuggestionField';
import {FormControl, FormGroup, ControlLabel, Button, Panel} from 'react-bootstrap';

class SuggestionAddingForm extends Component {
    static validate(values, {fieldName}) {
        const errors = {};
        if (!values[fieldName]) {
            errors[fieldName] = 'Required';
        }
        return errors;
    }

    constructor(props) {
        super(props);
        this.inputName = 'suggestion';
        this.submit = this.submit.bind(
            this,
            'https://5a9ebc95b1404b0014cfe239.mockapi.io/paragraphs',
            this.props.paragraphId,
            this.props.articleUrl,
            this.props.paragraphOriginalText,
        );
    }

    submit(url, paragraphId, articleUrl, originalText, usersText) {
        this.props.addUserSuggestionToBackEnd(url, {
            paragraphId,
            suggestionData: {
                articleUrl,
                originalText,
                userText: usersText[this.inputName]
            }
        });
    }

    render() {
        const {paragraphOriginalText, formName, reduxForm} = this.props;

        return (
            <Panel>
                <Panel.Body>
                    <FormContainer
                        form={formName}
                        fieldName={this.inputName}
                        validate={SuggestionAddingForm.validate}
                        customSubmitHandler={this.submit}
                    >
                        <FormGroup controlId="originalText">
                            <ControlLabel>Original text</ControlLabel>
                            <FormControl.Static>{paragraphOriginalText}</FormControl.Static>
                        </FormGroup>
                        <br/>
                        <Field
                            name={this.inputName}
                            component={SuggestionField}
                            label="User version"
                            placeholder="Add your suggestion"
                        />
                        <Button
                            className="pull-right"
                            bsStyle="default"
                            type="submit"
                            disabled={reduxForm[formName] && !!reduxForm[formName].syncErrors}
                        >
                            SEND CHANGES
                        </Button>
                    </FormContainer>
                </Panel.Body>
            </Panel>
        );
    }
}

SuggestionAddingForm.propTypes = {
    paragraphId: PropTypes.string.isRequired,
    paragraphOriginalText: PropTypes.string.isRequired,
    articleUrl: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    reduxForm: PropTypes.object.isRequired,
    addUserSuggestionToBackEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        reduxForm: state.form,
    };
};

const mapDispatchToProps = {addUserSuggestionToBackEnd};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionAddingForm);
