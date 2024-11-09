package com.example.tft.tests;

import io.github.cdimascio.dotenv.Dotenv;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;

public class SampleTest {

    private String apiKey;

    @BeforeClass(alwaysRun = true)
    public void setup() {
        // Load from .env file
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        // Try to get API key from multiple sources
        apiKey = System.getenv("RIOT_API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            apiKey = dotenv.get("RIOT_API_KEY");
        }

        assertNotNull(apiKey, "RIOT_API_KEY must be set either in .env file or as environment variable");
    }

    @Test
    public void testEnvironmentSetup() {
        assertTrue(true, "Basic test to verify TestNG is running");
    }

    @Test
    public void testApiKeyAvailable() {
        assertNotNull(apiKey, "API key should be available");
        assertTrue(apiKey.startsWith("RGAPI-"), "API key should start with RGAPI-");
    }
}