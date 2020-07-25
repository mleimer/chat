package com.mleimer.chat.repository.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "MESSAGE")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "MESSAGE_ID", nullable = false)
    private int messageId;

    @Column(name = "MESSAGE")
    private String message;

    @Column(name = "USER_NAME")
    private String userName;

    @Column(name = "TIMESTAMP")
    private LocalDateTime timestamp;

}
