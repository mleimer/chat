package com.mleimer.chat.message;

import com.mleimer.chat.repository.MessageRepository;
import com.mleimer.chat.repository.model.Message;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @Mock
    private MessageRepository messageRepositoryMock;

    private MessageService messageService;

    @BeforeEach
    void setup() {
        messageService = new MessageService(messageRepositoryMock);
    }

    @Test
    void givenPersistedMessages_whenGetAllMessages_shouldReturnNewestMessageLast() {
        // Given
        String userName1 = "Smartin";
        String userName2 = "Charlie";
        String userName3 = "Fritz";

        String messageContent1 = "Hey Charlie!";
        String messageContent2 = "Hey Smartin, how are you?";
        String messageContent3 = "Hello guys";

        LocalDateTime timestamp1 = LocalDateTime.of(2018, 1, 1, 12, 0, 23);
        LocalDateTime timestamp2 = LocalDateTime.of(2018, 1, 1, 12, 1, 14);
        LocalDateTime timestamp3 = LocalDateTime.of(2018, 1, 1, 12, 2, 4);

        Message message1 = Message.builder().userName(userName1).message(messageContent1).timestamp(timestamp1).build();
        Message message2 = Message.builder().userName(userName2).message(messageContent2).timestamp(timestamp2).build();
        Message message3 = Message.builder().userName(userName3).message(messageContent3).timestamp(timestamp3).build();

        when(messageRepositoryMock.findAll()).thenReturn(asList(message3, message1, message2));

        // When
        List<MessageDto> allMessages = messageService.getAllMessages();

        // Then
        assertNotNull(allMessages);
        assertEquals(3, allMessages.size());
        assertEquals(messageContent1, allMessages.get(0).getContent());
        assertEquals(messageContent2, allMessages.get(1).getContent());
        assertEquals(messageContent3, allMessages.get(2).getContent());
    }

}