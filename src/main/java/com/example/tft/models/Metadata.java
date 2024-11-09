package com.example.tft.models;

import lombok.Data;

import java.util.List;

@Data
public class Metadata {
    private String data_version;
    private String match_id;
    private List<String> participants;
}
