import { post } from '../services/send_message_service';
import { get } from '../services/history';
const SEND_MESSAGE = "SEND_MESSAGE";
const HISTORY = "HISTORY";
export const home_controller = async (request, data) => {
    if(request == SEND_MESSAGE)
        return await post("api/chat/", data);
    else if(request == HISTORY)
        return await get("api/history/");
};