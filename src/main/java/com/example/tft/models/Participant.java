package com.example.tft.models;

import lombok.Data;

import java.util.List;

@Data
public class Participant {
    private List<String> augments;
    private Companion companion;
    private Integer gold_left;
    private Integer last_round;
    private Integer level;
    private Integer placement;
    private Integer players_eliminated;
    private String puuid;
    private Double time_eliminated;
    private Integer total_damage_to_players;
    private List<Trait> traits;
    private List<Unit> units;
}
