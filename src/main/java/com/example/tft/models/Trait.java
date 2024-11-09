package com.example.tft.models;

import lombok.Data;

@Data
public class Trait {
    private String name;
    private Integer num_units;
    private Integer style;
    private Integer tier_current;
    private Integer tier_total;
}
