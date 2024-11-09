package com.example.tft.services;

import com.example.tft.models.TFTMatch;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class TFTMatchService {

    private final ObjectMapper objectMapper;

    public TFTMatchService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public TFTMatch getMatchData(String matchId) {
        try {
            File file = new File("src/main/resources/" + matchId + ".json");
            return objectMapper.readValue(file, TFTMatch.class);
        } catch (IOException e) {
            throw new RuntimeException("Error reading match data", e);
        }
    }
} 