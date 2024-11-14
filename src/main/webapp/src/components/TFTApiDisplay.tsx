import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChevronDown, Clock, Star, Shield, Crown, Users } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface TFTMatch {
  metadata: {
    data_version: string;
    match_id: string;
    participants: string[];
  };
  info: {
    game_datetime: number;
    game_length: number;
    game_version: string;
    participants: Participant[];
    queue_id: number;
    tft_game_type: string;
    tft_set_core_name: string;
    tft_set_number: number;
  };
}

interface Participant {
  augments: string[];
  companion: {
    content_ID: string;
    item_ID: number;
    skin_ID: number;
    species: string;
  };
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  time_eliminated: number;
  total_damage_to_players: number;
  traits: Trait[];
  units: Unit[];
}

interface Trait {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}

interface Unit {
  character_id: string;
  itemNames: string[];
  name: string;
  rarity: number;
  tier: number;
}

const TFTApiDisplay: React.FC = () => {
  const [matchData, setMatchData] = useState<TFTMatch | null>(null)

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get('/api/matches/NA1_4911969563')
        setMatchData(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    
    fetchMatchData()
  }, [])

  const formatGameLength = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  if (!matchData) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Match Details</h1>
        <p className="text-muted-foreground">
          Viewing match {matchData.metadata.match_id}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Match Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Game Date</p>
                <p>{formatDate(matchData.info.game_datetime)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p>{formatGameLength(matchData.info.game_length)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Set</p>
                <p>{matchData.info.tft_set_core_name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {matchData.info.participants
                  .sort((a, b) => a.placement - b.placement)
                  .map((participant, index) => (
                    <Collapsible key={participant.puuid}>
                      <Card>
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                                {index === 0 ? (
                                  <Crown className="w-4 h-4 text-yellow-500" />
                                ) : (
                                  <span className="text-sm font-medium">{participant.placement}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-muted-foreground" />
                                <span>Level {participant.level}</span>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <Separator />
                          <div className="p-4 space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Gold Left</p>
                                <p>{participant.gold_left}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Last Round</p>
                                <p>{participant.last_round}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Time Eliminated</p>
                                <p>{formatGameLength(participant.time_eliminated)}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Damage Dealt</p>
                                <p>{participant.total_damage_to_players}</p>
                              </div>
                            </div>

                            {/* Augments */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Augments</h4>
                              <div className="flex flex-wrap gap-2">
                                {participant.augments.map((augment, i) => (
                                  <Badge key={i} variant="secondary">
                                    {augment.replace('TFT', '').replace('_Augment_', ': ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Traits */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Active Traits</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {participant.traits
                                  .filter(trait => trait.tier_current > 0)
                                  .sort((a, b) => b.tier_current - a.tier_current)
                                  .map((trait, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div className={`w-3 h-3 rounded-full ${
                                        trait.tier_current === 3 ? 'bg-yellow-500' :
                                        trait.tier_current === 2 ? 'bg-secondary' :
                                        'bg-muted'
                                      }`} />
                                      <span>{trait.name.replace('Set10_', '')}</span>
                                      <span className="text-sm text-muted-foreground">({trait.num_units})</span>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            {/* Units */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Units</h4>
                              <div className="grid gap-2">
                                {participant.units.map((unit, i) => (
                                  <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                                    <div className="flex">
                                      {Array.from({ length: unit.tier }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                      ))}
                                    </div>
                                    <span>{unit.character_id.replace('TFT10_', '')}</span>
                                    <div className="flex flex-wrap gap-1 ml-auto">
                                      {unit.itemNames.map((item, j) => (
                                        <Badge key={j} variant="outline" className="text-xs">
                                          {item.replace('TFT_Item_', '')}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TFTApiDisplay