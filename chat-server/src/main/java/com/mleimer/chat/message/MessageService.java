package com.mleimer.chat.message;

import com.mleimer.chat.repository.MessageRepository;
import com.mleimer.chat.repository.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.StreamSupport;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageDto saveMessage(MessageDto uiMessage) {
        Message message = Message.builder()
                .message(HtmlUtils.htmlEscape(uiMessage.getContent()))
                .userName(HtmlUtils.htmlEscape(uiMessage.getUserName()))
                .timestamp(LocalDateTime.now())
                .build();
        Message savedMessage = messageRepository.save(message);
        return MessageDto.fromMessage(savedMessage);
    }

    public List<MessageDto> getAllMessages() {
        Iterable<Message> messages = messageRepository.findAll();
        return StreamSupport
                .stream(messages.spliterator(), false)
                .sorted(Comparator.comparing(Message::getTimestamp))
                .map(MessageDto::fromMessage)
                .collect(toList());
    }
}
