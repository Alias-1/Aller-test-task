import * as c from '../actions/constants';
import uniqueid from 'uniqid';

const INITIAL_STATE = {
    paragraphsList: {
        paragraphs: [],
        suggestions: {},
        error: null,
        loading: false
    }
};

const getClone = (state) => JSON.parse(JSON.stringify(state));

export default function(state = INITIAL_STATE, action) {
    const {paragraphs, suggestions} = state.paragraphsList;
    let error;
    let clone;
    switch (action.type) {

        case c.FETCH_PARAGRAPHS:
            return {
                paragraphsList: {paragraphs: [], suggestions: {}, error: null, loading: true}
            };

        case c.FETCH_PARAGRAPHS_SUCCESS:
            return {
                paragraphsList: {
                    paragraphs: action.payload.map((p) => {
                        return {
                            id: `par-${uniqueid()}`,
                            originalText: p,
                            approvedSuggestion: null
                        };
                    }),
                    suggestions: {},
                    error: null,
                    loading: false
                }
            };

        case c.FETCH_PARAGRAPHS_FAILURE:
            error = String(action.payload);
            return {
                paragraphsList: {paragraphs: [], suggestions: {}, error: error, loading: false}
            };

        case c.URL_VALIDATION_FAILURE:
            error = String(action.payload);
            return {
                paragraphsList: {paragraphs: [], suggestions: {}, error: error, loading: false}
            };

        case c.ADD_USER_SUGGESTION:
            return {
                paragraphsList: {
                    paragraphs: [...paragraphs],
                    suggestions: {...suggestions},
                    error: null,
                    loading: true
                }
            };

        case c.ADD_USER_SUGGESTION_SUCCESS:
            return {
                paragraphsList: {
                    paragraphs: [...paragraphs],
                    suggestions: Object.assign({}, {...suggestions}, {
                        [action.payload.paragraphId]: suggestions[action.payload.paragraphId]
                            ? [...suggestions[action.payload.paragraphId], action.payload.suggestionData]
                            : [action.payload.suggestionData]
                    }),
                    error: null,
                    loading: false
                }
            };

        case c.ADD_USER_SUGGESTION_FAILURE:
            error = String(action.payload);
            return {
                paragraphsList: {
                    paragraphs: [...paragraphs],
                    suggestions: {...suggestions},
                    error: error,
                    loading: false
                }
            };

        case c.DELETE_PARAGRAPH_SUGGESTIONS:
            const paragraphsClone = getClone(paragraphs);
            paragraphsClone.find((p) => p.id === action.payload.paragraphId).approvedSuggestion = null;
            clone = getClone(suggestions);
            delete clone[action.payload.paragraphId];
            return {
                paragraphsList: {
                    paragraphs: [...paragraphs],
                    suggestions: clone,
                    error: null,
                    loading: false
                }
            };

        case c.APPROVE_SUGGESTION:
            clone = getClone(paragraphs);
            clone.find((p) => p.id === action.payload.paragraphId).approvedSuggestion = action.payload.suggestionText;
            return {
                paragraphsList: {
                    paragraphs: clone,
                    suggestions: {...suggestions},
                    error: null,
                    loading: false
                }
            };

        default:
            return state;
    }
}
