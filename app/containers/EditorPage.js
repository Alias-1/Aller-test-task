import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import ParagraphSuggestionsEditingForm from './ParagraphSuggestionsEditingForm';
import queryString from 'query-string';
import uniqueid from 'uniqid';

class EditorPage extends Component {
    renderParagraphEditingFormsList() {
        const shouldRenderApproved = queryString.parse(this.props.queryParams).isApproved === 'true';
        const {suggestions, paragraphs} = this.props;
        const Arr = [];

        for (let key in suggestions) {
            if (suggestions.hasOwnProperty(key) &&
                !!(paragraphs.find((p) => p.id === key).approvedSuggestion) === shouldRenderApproved) {
                const currentParagraph = paragraphs.find((p) => p.id === key);
                Arr.push(
                    <Row key={key}>
                        <Col sm={10} smOffset={1} lg={8} lgOffset={2} xs={12}>
                            <ParagraphSuggestionsEditingForm
                                paragraph={currentParagraph}
                                suggestions={suggestions[key]}
                            />
                        </Col>
                    </Row>
                );
            }
        }
        if (!Arr.length) Arr.push(<Row key={uniqueid()}><h3>No items to display</h3></Row>);
        return Arr;
    }

    render() {
        if (!this.props.paragraphs.length || !Object.keys(this.props.suggestions).length) {
            return <h3>No items to display</h3>;
        }

        return (
            <div>{this.renderParagraphEditingFormsList()}</div>
        );
    }
}

EditorPage.propTypes = {
    queryParams: PropTypes.string,
    paragraphs: PropTypes.array.isRequired,
    suggestions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        queryParams: state.routing.location.search,
        paragraphs: state.paragraphs.paragraphsList.paragraphs,
        suggestions: state.paragraphs.paragraphsList.suggestions,
    };
};

export default connect(mapStateToProps)(EditorPage);
