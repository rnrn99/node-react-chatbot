import {
    SAVE_MSG,
} from './types';

export function saveMsg(dataToSubmit) {
   
    return {
        type: SAVE_MSG,
        payload: dataToSubmit
    }
}
