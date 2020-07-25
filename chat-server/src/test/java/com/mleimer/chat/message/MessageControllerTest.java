package com.mleimer.chat.message;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageControllerTest {

    @LocalServerPort
    private int port;

    private String URL;

    private static final String SEND_MESSAGE_ENDPOINT = "/app/message";
    private static final String SUBSCRIBE_MESSAGES = "/topic/message";

    private CompletableFuture<MessageDto> completableFuture;

    @BeforeEach
    public void setup() {
        completableFuture = new CompletableFuture<>();
        URL = "ws://localhost:" + port + "/chat";
    }

    @Test
    public void testSendMessageAndAwaitBroadcast() throws InterruptedException, ExecutionException, TimeoutException {
        final String messageContent = "Hello world!";
        final String userName = "Smartin";

        StompSession stompSession = createStompSession();

        MessageDto messageDto = MessageDto.builder().content(messageContent).userName(userName).build();

        stompSession.subscribe(SUBSCRIBE_MESSAGES, new CreateMessageDtoStompFrameHandler());
        stompSession.send(SEND_MESSAGE_ENDPOINT, messageDto);

        MessageDto receivedMessage = completableFuture.get(5, SECONDS);

        assertNotNull(receivedMessage);
        assertEquals(messageContent, receivedMessage.getContent());
        assertEquals(userName, receivedMessage.getUserName());
    }

    private StompSession createStompSession() throws InterruptedException, ExecutionException, TimeoutException {
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSessionHandlerAdapter stompSessionHandlerAdapter = new StompSessionHandlerAdapter() {
        };
        return stompClient.connect(URL, stompSessionHandlerAdapter).get(1, SECONDS);
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