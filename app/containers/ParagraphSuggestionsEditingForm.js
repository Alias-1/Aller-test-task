import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {approveSuggestion, addUserSuggestionSuccess, deleteParagraphSuggestions} from '../actions/index';
import ParagraphSuggestionsContainer from '../components/ParagraphSuggestionsContainer';
import FormContainer from './FormContainer';
import SuggestionField from '../components/SuggestionField';
import SuggestionAddingForm from './SuggestionAddingForm';
import SuggestionApprovingForm from '../components/SuggestionApprovingForm';
import {FormControl, ListGroupItem} from 'react-bootstrap';
import uniqueid from 'uniqid';

class ParagraphSuggestionsEditingForm extends Component {
    constructor(props) {
        super(props);
        this.inputName = 'authorSuggestion';
        this.formName = `${this.props.paragraph.id}-authorSuggestion`;
    }

    submit(paragraphId, originalText, articleUrl, suggestion) {
        this.props.addUserSuggestionSuccess(
            paragraphId,
            {
                articleUrl,
                originalText,
                userText: suggestion[this.inputName]
            }
        );
        this.props.approveSuggestion(
            paragraphId,
            suggestion[this.inputName]
        );
    }

    render() {
        const {paragraph, suggestions, reduxForm} = this.props;

        return (
            <ParagraphSuggestionsContainer
                originalText={paragraph.originalText}
                deleteHandler={this.props.deleteParagraphSuggestions.bind(null, paragraph.id)}
            >
                {suggestions.map((suggestionData) =>
                    <ListGroupItem key={uniqueid()}>
                        <SuggestionApprovingForm
                            isApproved={suggestionData.userText === paragraph.approvedSuggestion}
                            isDisabled={suggestionData.userText === paragraph.approvedSuggestion}
                            approveHandler={this.props.approveSuggestion.bind(null, paragraph.id, suggestionData.userText)}
                        >
                            <FormControl.Static>{suggestionData.userText}</FormControl.Static>
                        </SuggestionApprovingForm>
                    </ListGroupItem>
                )}
                <ListGroupItem key={paragraph.id}>
                    <FormContainer
                        form={this.formName}
                        fieldName={this.inputName}
                        validate={SuggestionAddingForm.validate}
                        customSubmitHandler={this.submit.bind(this, paragraph.id, paragraph.originalText, suggestions[0].articleUrl)}
                    >
                        <SuggestionApprovingForm
                            isDisabled={!!reduxForm[this.formName] && !!reduxForm[this.formName].syncErrors}
                        >
                            <Field
                                name={this.inputName}
                                component={SuggestionField}
                                placeholder="Type your variant"
                            />
                        </SuggestionApprovingForm>
                    </FormContainer>
                </ListGroupItem>
            </ParagraphSuggestionsContainer>
        );
    }
}

ParagraphSuggestionsEditingForm.propTypes = {
    paragraph: PropTypes.object.isRequired,
    suggestions: PropTypes.array.isRequired,
    reduxForm: PropTypes.object.isRequired,
    approveSuggestion: PropTypes.func.isRequired,
    addUserSuggestionSuccess: PropTypes.func.isRequired,
    deleteParagraphSuggestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {reduxForm: state.form};
};

const mapDispatchToProps = {approveSuggestion, addUserSuggestionSuccess, deleteParagraphSuggestions};

export default connect(mapStateToProps, mapDispatchToProps)(ParagraphSuggestionsEditingForm);
