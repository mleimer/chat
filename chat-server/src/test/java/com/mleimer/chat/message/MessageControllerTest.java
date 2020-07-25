package com.mleimer.chat.message;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
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
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageControllerTest {

    @Value("${local.server.port}")
    private int port;
    private String URL;

    private static final String SEND_MESSAGE_ENDPOINT = "/app/message";
    private static final String SUBSCRIBE_MESSAGES = "/topic/message";

    private CompletableFuture<MessageDto> completableFuture;

    @Before
    public void testClassSetup() {
        completableFuture = new CompletableFuture<>();
        URL = "ws://localhost:" + port + "/chat";
    }

    @Test
    public void givenMessage_whenPostedToMessageEndpoint_shouldBroadcastSameMessageOnTopic() throws InterruptedException, ExecutionException, TimeoutException {
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