import * as c from './constants';

export function fetchParagraphs() {
    return {
        type: c.FETCH_PARAGRAPHS
    };
}

export function fetchParagraphsSuccess(paragraphs) {
    return {
        type: c.FETCH_PARAGRAPHS_SUCCESS,
        payload: paragraphs
    };
}

export function fetchParagraphsFailure(error) {
    return {
        type: c.FETCH_PARAGRAPHS_FAILURE,
        payload: error
    };
}

export function urlValidationFailure(error) {
    return {
        type: c.URL_VALIDATION_FAILURE,
        payload: error
    };
}

const mockParagraphReqData = {
    paragraphs: [
        'It was amazing way. Sun was shining brightly',
        'This is wrong text',
        'etc paragraph content',
    ]
};

export function fetchParagraphsData(url) {
    return (dispatch) => {
        dispatch(fetchParagraphs());
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            // .then((data) => dispatch(fetchParagraphsSuccess(data.paragraphs)))
			.then(() => dispatch(fetchParagraphsSuccess(mockParagraphReqData.paragraphs)))
            .catch((e) => {
                dispatch(fetchParagraphsFailure(e));
            });
    };
}

export function addUserSuggestion() {
    return {
        type: c.ADD_USER_SUGGESTION,
    };
}

export function addUserSuggestionSuccess(paragraphId, suggestionData) {
    return {
        type: c.ADD_USER_SUGGESTION_SUCCESS,
        payload: {
            paragraphId,
            suggestionData,
        }
    };
}

export function addUserSuggestionFailure(error) {
    return {
        type: c.ADD_USER_SUGGESTION_FAILURE,
        payload: error
    };
}

export function addUserSuggestionToBackEnd(url, data) {
    return (dispatch) => {
        dispatch(addUserSuggestion());
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data.suggestionData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(() => dispatch(addUserSuggestionSuccess(data.paragraphId, data.suggestionData)))
            .catch((e) => {
                dispatch(addUserSuggestionFailure(e));
            });
    };
}

export function approveSuggestion(paragraphId, suggestionText) {
    return {
        type: c.APPROVE_SUGGESTION,
        payload: {
            paragraphId,
            suggestionText
        }
    };
}

export function deleteParagraphSuggestions(paragraphId) {
    return {
        type: c.DELETE_PARAGRAPH_SUGGESTIONS,
        payload: { paragraphId }
    };
}
