package com.example.tft.controllers;

import com.example.tft.models.TFTMatch;
import com.example.tft.services.TFTMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matches")
public class TFTMatchController {

    private final TFTMatchService tftMatchService;

    public TFTMatchController(TFTMatchService tftMatchService) {
        this.tftMatchService = tftMatchService;
    }

    @GetMapping("/{matchId}")
    public ResponseEntity<TFTMatch> getMatchData(@PathVariable("matchId") String matchId) {
        try {
            TFTMatch match = tftMatchService.getMatchData(matchId);
            return ResponseEntity.ok(match);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
} 