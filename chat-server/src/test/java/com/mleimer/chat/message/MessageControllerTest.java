package com.mleimer.chat.message;

import com.mleimer.chat.repository.MessageRepository;
import com.mleimer.chat.repository.model.Message;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;
import java.util.stream.StreamSupport;

import static java.util.concurrent.TimeUnit.SECONDS;
import static java.util.stream.Collectors.toList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageControllerTest {

    @LocalServerPort
    private int port;

    private String WEBSOCKET_URL;
    private String REST_URL;

    private static final String SEND_MESSAGE_ENDPOINT = "/app/message";
    private static final String SUBSCRIBE_MESSAGES = "/topic/message";

    private CompletableFuture<MessageDto> completableFuture;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    public void setup() {
        completableFuture = new CompletableFuture<>();
        WEBSOCKET_URL = "ws://localhost:" + port + "/chat";
        REST_URL = "http://localhost:" + port;
        messageRepository.deleteAll();
    }

    @Test
    public void givenNewMessage_whenPostMessage_shouldBroadcastThatMessage() throws InterruptedException, ExecutionException, TimeoutException {
        // Given
        final String messageContent = "Hello world!";
        final String userName = "Smartin";

        MessageDto messageDto = MessageDto.builder().content(messageContent).userName(userName).build();

        // When
        StompSession stompSession = createStompSession();
        stompSession.subscribe(SUBSCRIBE_MESSAGES, new CreateMessageDtoStompFrameHandler());
        stompSession.send(SEND_MESSAGE_ENDPOINT, messageDto);
        MessageDto receivedMessage = completableFuture.get(5, SECONDS);

        // Then
        assertNotNull(receivedMessage);
        assertEquals(messageContent, receivedMessage.getContent());
        assertEquals(userName, receivedMessage.getUserName());
    }

    @Test
    public void givenNewMessage_whenPostMessage_shouldPersistMessage() throws InterruptedException, ExecutionException, TimeoutException {
        // Given
        final String messageContent = "Hello world!";
        final String userName = "Smartin";

        MessageDto messageDto = MessageDto.builder().content(messageContent).userName(userName).build();

        // When
        StompSession stompSession = createStompSession();
        stompSession.subscribe(SUBSCRIBE_MESSAGES, new CreateMessageDtoStompFrameHandler());
        stompSession.send(SEND_MESSAGE_ENDPOINT, messageDto);
        completableFuture.get(5, SECONDS);

        // Then
        List<Message> persistedMessages = StreamSupport
                .stream(messageRepository.findAll().spliterator(), false)
                .collect(toList());

        assertNotNull(persistedMessages);
        assertEquals(1, persistedMessages.size());

        Message persistedMessage = persistedMessages.get(0);
        assertEquals(userName, persistedMessage.getUserName());
        assertEquals(messageContent, persistedMessage.getMessage());
        assertNotNull(persistedMessage.getTimestamp());
    }

    @Test
    public void givenPersistedMessages_whenGetMessages_shouldReturnSavedMessages() {
        // Given
        String userName1 = "Smartin";
        String userName2 = "Charlie";

        String messageContent1 = "Hey Charlie!";
        String messageContent2 = "Hey Smartin, how are you?";

        Message message1 = Message.builder().userName(userName1).message(messageContent1).timestamp(LocalDateTime.of(2018, 1, 1, 12, 0, 23)).build();
        Message message2 = Message.builder().userName(userName2).message(messageContent2).timestamp(LocalDateTime.of(2018, 1, 1, 12, 1, 14)).build();

        messageRepository.save(message1);
        messageRepository.save(message2);

        // When
        ResponseEntity<MessageDto[]> response = this.restTemplate.getForEntity(REST_URL + "/message/", MessageDto[].class);

        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        MessageDto[] body = response.getBody();
        assertNotNull(body);

        assertEquals(2, body.length);

        assertEquals(userName1, body[0].getUserName());
        assertEquals(messageContent1, body[0].getContent());

        assertEquals(userName2, body[1].getUserName());
        assertEquals(messageContent2, body[1].getContent());
    }

    private StompSession createStompSession() throws InterruptedException, ExecutionException, TimeoutException {
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSessionHandlerAdapter stompSessionHandlerAdapter = new StompSessionHandlerAdapter() {
        };
        return stompClient.connect(WEBSOCKET_URL, stompSessionHandlerAdapter).get(1, SECONDS);
    }

    private List<Transport> createTransportClient() {
        List<Transport> transports = new ArrayList<>(1);
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));
        return transports;
    }

    private class CreateMessageDtoStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return MessageDto.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            completableFuture.complete((MessageDto) o);
        }
    }
}