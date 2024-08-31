import { post } from '../services/send_message_service';

const SEND_MESSAGE = "SEND_MESSAGE";

export const home_controller = async (request, data) => {
    if(request == SEND_MESSAGE)
        return await post("api/chat/", data);
};