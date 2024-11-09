package com.example.tft.controllers;

import com.example.tft.models.TFTMatch;
import com.example.tft.services.TFTMatchService;
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
    public TFTMatch getMatchData(@PathVariable String matchId) {
        return tftMatchService.getMatchData(matchId);
    }
} 