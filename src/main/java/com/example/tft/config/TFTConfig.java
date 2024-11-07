package com.example.tft.config;

import lombok.Data;

@Data
public class TFTConfig {
    private static final String DEFAULT_REGION = "na1";
    private final String apiKey;
    private final String baseUrl;

    public TFTConfig(String apiKey) {
        this(apiKey, String.format("https://%s.api.riotgames.com", DEFAULT_REGION));
    }

    public TFTConfig(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
}