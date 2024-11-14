package com.example.tft.services;

import com.example.tft.models.TFTMatch;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@Service
public class TFTMatchService {

    private final ObjectMapper objectMapper;
    private final Logger logger = LoggerFactory.getLogger(TFTMatchService.class);

    public TFTMatchService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public TFTMatch getMatchData(String matchId) {
        try {
            File file = new File("src/main/resources/" + matchId + ".json");
            if (!file.exists()) {
                logger.error("JSON file not found: {}", matchId);
                throw new FileNotFoundException("Match data file not found");
            }
            return objectMapper.readValue(file, TFTMatch.class);
        } catch (IOException e) {
            logger.error("Error reading match data for {}: {}", matchId, e.getMessage());
            throw new RuntimeException("Error reading match data", e);
        }
    }
} 