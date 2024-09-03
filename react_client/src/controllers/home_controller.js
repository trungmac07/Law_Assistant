import { send_message } from '../services/send_message_service';
import { get_history } from '../services/history';
import { get_conversation } from '../services/retrieve_conversation';
const SEND_MESSAGE = "SEND_MESSAGE";
const HISTORY = "HISTORY";
const RETRIEVE_CONVERSATION = "RETRIEVE_CONVERSATION";
export const home_controller = async (request, data, kwargs) => {

    if(request == SEND_MESSAGE)
        return await send_message("http://localhost:8000/api/chat/", data, kwargs);
    else if(request == HISTORY)
        return await get_history("api/history/");
    else if(request == RETRIEVE_CONVERSATION)
        return await get_conversation("api/conversation/", data);
};