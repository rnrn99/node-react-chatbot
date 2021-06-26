import {
    SAVE_MSG,
} from '../_actions/types';

export default function msgReducer(state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MSG:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}