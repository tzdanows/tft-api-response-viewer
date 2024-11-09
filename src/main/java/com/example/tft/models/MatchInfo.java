package com.example.tft.models;

import lombok.Data;

import java.util.List;

@Data
public class MatchInfo {
    private Long game_datetime;
    private Double game_length;
    private String game_version;
    private List<Participant> participants;
    private Integer queue_id;
    private String tft_game_type;
    private String tft_set_core_name;
    private Integer tft_set_number;
}
