package com.example.tft.controllers;

import com.example.tft.App;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(classes = App.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TFTMatchControllerTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    @Test
    public void testGetMatchData() {
        given()
            .when()
            .get("/api/matches/NA1_4911969563")
            .then()
            .statusCode(200)
            .body("metadata.match_id", equalTo("NA1_4911969563"))
            .body("info.tft_set_number", equalTo(10));
    }
} 