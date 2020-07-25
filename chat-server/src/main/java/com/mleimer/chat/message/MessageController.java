package com.mleimer.chat.message;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/message")
    public MessageDto postMessage(MessageDto messageDto) {
        return messageDto;
    }

}
