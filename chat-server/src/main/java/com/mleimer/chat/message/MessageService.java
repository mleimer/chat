package com.mleimer.chat.message;

import com.mleimer.chat.repository.MessageRepository;
import com.mleimer.chat.repository.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.StreamSupport;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<MessageDto> getAllMessages() {
        Iterable<Message> messages = messageRepository.findAll();
        return StreamSupport
                .stream(messages.spliterator(), false)
                .sorted(Comparator.comparing(Message::getTimestamp))
                .map(MessageDto::fromMessage)
                .collect(toList());
    }
}
