package com.mleimer.chat.message;

import com.mleimer.chat.repository.model.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto implements Serializable {

    private String content;
    private String userName;

    public static MessageDto fromMessage(Message message) {
        return MessageDto.builder()
                .content(message.getMessage())
                .userName(message.getUserName())
                .build();
    }

}