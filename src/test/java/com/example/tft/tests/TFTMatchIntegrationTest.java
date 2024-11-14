package com.example.tft.tests;

import com.example.tft.tests.config.BaseTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class TFTMatchIntegrationTest extends BaseTest {

    @Test
    void testGetMatchEndpoint() {
        given()
            .spec(requestSpec)
            .when()
            .get("/matches/NA1_4911969563")
            .then()
            .statusCode(200)
            .body("metadata.match_id", equalTo("NA1_4911969563"))
            .body("metadata.data_version", equalTo("5"))
            .body("info.tft_set_number", equalTo(10))
            .body("info.participants", hasSize(8));
    }

    @Test
    void testGetMatchNotFound() {
        given()
            .spec(requestSpec)
            .when()
            .get("/matches/INVALID_MATCH_ID")
            .then()
            .statusCode(404);
    }

    @Test
    void testMatchParticipantDetails() {
        given()
            .spec(requestSpec)
            .when()
            .get("/matches/NA1_4911969563")
            .then()
            .statusCode(200)
            .body("info.participants[0].augments", hasSize(3))
            .body("info.participants[0].level", greaterThanOrEqualTo(1))
            .body("info.participants[0].traits", not(empty()))
            .body("info.participants[0].units", not(empty()));
    }
} 