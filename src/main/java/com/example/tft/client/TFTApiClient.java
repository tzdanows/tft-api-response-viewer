package com.example.tft.client;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import com.example.tft.models.TFTMatch;

public class TFTApiClient {
    private final String apiKey;
    private final String baseUrl;

    public TFTApiClient(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        RestAssured.baseURI = baseUrl;
    }

    // map response details to models (TODO: additional functionality)
    public TFTMatch getMatch(String matchId, String region) {
        Response response = RestAssured.given()
                .header("X-Riot-Token", apiKey)
                .when()
                .get("/tft/match/v1/matches/{matchId}", matchId);

        response.then().statusCode(200);
        return response.as(TFTMatch.class);
    }

    public String[] getMatchesByPuuid(String puuid, String region, int count) {
        Response response = RestAssured.given()
                .header("X-Riot-Token", apiKey)
                .queryParam("count", count)
                .when()
                .get("/tft/match/v1/matches/by-puuid/{puuid}/ids", puuid);

        response.then().statusCode(200);
        return response.as(String[].class);
    }
}