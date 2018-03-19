import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchParagraphsData, addUserSuggestionToBackEnd, urlValidationFailure} from '../actions/index';
import SuggestionAddingForm from './SuggestionAddingForm';
import {ProgressBar, Row, Col, Modal} from 'react-bootstrap';
import queryString from 'query-string';
import validUrl from 'valid-url';

class UserPage extends Component {
    static renderModal(show, header, body) {
        return (
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
            </Modal>
        );
    }

    componentDidMount() {
        const parsedParams = queryString.parse(this.props.queryParams);

        if (validUrl.isUri(parsedParams.articleURL)) {
            this.props.fetchParagraphsData(parsedParams.articleURL);
        } else {
            const error = new Error();
            error.name = 'UrlValidationError';
            error.message = 'URL parameter is invalid!';
            this.props.urlValidationFailure(error);
        }
    }

    render() {
        const {loading, error, paragraphs, queryParams} = this.props;

        if (loading) {
            return UserPage.renderModal(loading, 'Loading…', <ProgressBar active now={100}/>);
        }

        if (error) {
            return UserPage.renderModal(!!error, 'Error', error);
        }

        if (!paragraphs.length) {
            return <h3>No items to display</h3>;
        }

        return (
            <div>
                {paragraphs.map((p) =>
                    <Row key={p.id}>
                        <Col md={8} mdOffset={2} xs={12}>
                            <SuggestionAddingForm
                                formName={`${p.id}-form`}
                                paragraphId={p.id}
                                paragraphOriginalText={p.originalText}
                                articleUrl={queryString.parse(queryParams).articleURL}
                            />
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

UserPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.object),
    queryParams: PropTypes.string,
    fetchParagraphsData: PropTypes.func.isRequired,
    addUserSuggestionToBackEnd: PropTypes.func.isRequired,
    urlValidationFailure: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        queryParams: state.routing.location.search,
        paragraphs: state.paragraphs.paragraphsList.paragraphs,
        loading: state.paragraphs.paragraphsList.loading,
        error: state.paragraphs.paragraphsList.error,
    };
};

const mapDispatchToProps = {fetchParagraphsData, addUserSuggestionToBackEnd, urlValidationFailure};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
