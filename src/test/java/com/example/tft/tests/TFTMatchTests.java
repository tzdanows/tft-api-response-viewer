package com.example.tft.tests;

import com.example.tft.client.TFTApiClient;
import com.example.tft.models.TFTMatch;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import static org.testng.Assert.*;

public class TFTMatchTests {
    private TFTApiClient apiClient;

    @BeforeClass
    public void setup() {
        String apiKey = System.getenv("RIOT_API_KEY");
        apiClient = new TFTApiClient(apiKey, "https://na1.api.riotgames.com");
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }

    @Test
    public void testGetMatchDetails() {
        TFTMatch match = apiClient.getMatch("NA1_4911969563", "na1");

        // Validate match metadata
        assertNotNull(match.getMetadata());
        assertEquals(match.getMetadata().getMatch_id(), "NA1_4911969563");

        // Validate match info
        assertNotNull(match.getInfo());
        assertEquals(match.getInfo().getTft_set_number(), Integer.valueOf(10));

        // Validate participants
        assertNotNull(match.getInfo().getParticipants());
        assertFalse(match.getInfo().getParticipants().isEmpty());

        // Validate specific participant data
        match.getInfo().getParticipants().forEach(participant -> {
            assertNotNull(participant.getPuuid());
            assertTrue(participant.getPlacement() >= 1 && participant.getPlacement() <= 8);
            assertNotNull(participant.getUnits());
            assertNotNull(participant.getTraits());
        });
    }

    @Test
    public void testGetMatchesByPuuid() {
        String puuid = "L4zk9c5GXCElw6r_k3dm3xKrOyMHjNgy_ydJxQ9Ngs-zUCUXKBuQVOvq0LbOO5EGGuS087LQAxRpcg";
        String[] matches = apiClient.getMatchesByPuuid(puuid, "na1", 5);

        assertNotNull(matches);
        assertTrue(matches.length > 0);
        assertTrue(matches.length <= 5);
    }
}