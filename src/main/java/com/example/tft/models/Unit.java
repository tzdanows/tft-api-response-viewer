package com.example.tft.models;

import lombok.Data;

import java.util.List;

@Data
public class Unit {
    private String character_id;
    private List<String> itemNames;
    private String name;
    private Integer rarity;
    private Integer tier;
}
