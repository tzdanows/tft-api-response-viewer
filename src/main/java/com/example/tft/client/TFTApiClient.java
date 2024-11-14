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

    public TFTMatch getMatch(String matchId, String region) {
        Response response = RestAssured.given()
                .when()
                .get("/matches/{matchId}", matchId);

        response.then().statusCode(200);
        return response.as(TFTMatch.class);
    }
}

/*

    public TFTMatch getMatch(String matchId, String region) {
        Response response = RestAssured.given()
                .when()
                .get("/matches/{matchId}", matchId);

        response.then().statusCode(200);
        return response.as(TFTMatch.class);
    }
}
*/