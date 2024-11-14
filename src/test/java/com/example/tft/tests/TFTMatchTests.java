package com.example.tft.tests;

import com.example.tft.client.TFTApiClient;
import com.example.tft.models.TFTMatch;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import com.example.tft.tests.config.BaseTest;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("TFT Match Data Tests")
public class TFTMatchTests extends BaseTest {
    private TFTApiClient apiClient;

    @BeforeEach
    public void setup() {
        apiClient = new TFTApiClient("test-api-key", "http://localhost:8088/api");
    }

    @Test
    @DisplayName("Should correctly parse and validate TFT match details")
    void shouldParseAndValidateMatchDetails() {
        TFTMatch match = apiClient.getMatch("NA1_4911969563", "na1");

        // Validate match metadata from mock JSON
        assertAll("Match metadata validation",
            () -> assertNotNull(match.getMetadata(), "Metadata should not be null"),
            () -> assertEquals("NA1_4911969563", match.getMetadata().getMatch_id(), "Match ID should match"),
            () -> assertEquals("5", match.getMetadata().getData_version(), "Data version should be 5"),
            () -> assertEquals(8, match.getMetadata().getParticipants().size(), "Should have 8 participants")
        );

        // Validate match info from mock JSON
        assertAll("Match info validation",
            () -> assertNotNull(match.getInfo(), "Info should not be null"),
            () -> assertEquals(Integer.valueOf(10), match.getInfo().getTft_set_number(), "TFT set should be 10"),
            () -> assertEquals("standard", match.getInfo().getTft_game_type(), "Game type should be standard"),
            () -> assertEquals("TFTSet10", match.getInfo().getTft_set_core_name(), "Core set name should be TFTSet10")
        );
        
        // Validate first participant details
        var firstParticipant = match.getInfo().getParticipants().get(0);
        assertAll("First participant validation",
            () -> assertEquals(9, firstParticipant.getLevel(), "First participant should be level 9"),
            () -> assertEquals(1, firstParticipant.getPlacement(), "First participant should have placed 1st"),
            () -> assertEquals(3, firstParticipant.getAugments().size(), "First participant should have 3 augments")
        );
    }
}