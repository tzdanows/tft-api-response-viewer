import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Clock, Star, Shield, Crown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

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
  const [matchData, setMatchData] = useState<TFTMatch | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get<TFTMatch>('/api/matches/NA1_4911969563');
        setMatchData(response.data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
    fetchMatchData();
  }, []);

  if (!matchData) return <div>Loading...</div>;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatGameLength = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const SectionHeader: React.FC<{ title: string; section: string }> = ({ title, section }) => (
    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(section)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {expandedSections[section] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </div>
  );

  const DataItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const TraitBadge: React.FC<{ tier: number }> = ({ tier }) => {
    const colors: Record<number, string> = {
      0: 'bg-gray-500',
      1: 'bg-bronze-500',
      2: 'bg-silver-500',
      3: 'bg-gold-500'
    };
    return <div className={`w-6 h-6 rounded-full ${colors[tier] || 'bg-gray-500'}`} />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Metadata Section */}
      <Card>
        <CardHeader>
          <CardTitle>Match Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <DataItem label="Data Version" value={matchData.metadata.data_version} />
          <DataItem label="Match ID" value={matchData.metadata.match_id} />
          <DataItem label="Participant Count" value={matchData.metadata.participants.length} />
        </CardContent>
      </Card>

      {/* Match Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Match Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <DataItem label="Game Date" value={formatDate(matchData.info.game_datetime)} />
          <DataItem label="Game Length" value={formatGameLength(matchData.info.game_length)} />
          <DataItem label="Game Version" value={matchData.info.game_version} />
          <DataItem label="Queue ID" value={matchData.info.queue_id} />
          <DataItem label="Game Type" value={matchData.info.tft_game_type} />
          <DataItem label="Set Name" value={matchData.info.tft_set_core_name} />
          <DataItem label="Set Number" value={matchData.info.tft_set_number} />
        </CardContent>
      </Card>

      {/* Participants Section */}
      <Card>
        <CardHeader>
          <CardTitle>Player Details</CardTitle>
        </CardHeader>
        <CardContent>
          {matchData.info.participants
            .sort((a, b) => a.placement - b.placement)
            .map((participant, index) => (
            <div key={participant.puuid} className="mb-6 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Crown className={`h-6 w-6 ${index === 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <h3 className="text-xl font-bold">Place #{participant.placement}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Level {participant.level}</span>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <DataItem label="Gold Left" value={participant.gold_left} />
                <DataItem label="Last Round" value={participant.last_round} />
                <DataItem label="Time Eliminated" value={formatGameLength(participant.time_eliminated)} />
                <DataItem label="Total Damage" value={participant.total_damage_to_players} />
              </div>

              {/* Augments */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Augments:</h4>
                <div className="flex flex-wrap gap-2">
                  {participant.augments.map((augment, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 rounded-md text-sm">
                      {augment.replace('TFT', '').replace('_Augment_', ': ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Traits */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Active Traits:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {participant.traits
                    .filter(trait => trait.tier_current > 0)
                    .sort((a, b) => b.tier_current - a.tier_current)
                    .map((trait, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <TraitBadge tier={trait.tier_current} />
                      <span>{trait.name.replace('Set10_', '')}</span>
                      <span className="text-sm text-gray-500">({trait.num_units})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Units */}
              <div>
                <h4 className="font-semibold mb-2">Units:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {participant.units.map((unit, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-1">
                        {[...Array(unit.tier)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span>{unit.character_id.replace('TFT10_', '')}</span>
                      <div className="flex flex-wrap gap-1">
                        {unit.itemNames.map((item, j) => (
                          <span key={j} className="text-xs px-1 bg-blue-100 rounded">
                            {item.replace('TFT_Item_', '')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TFTApiDisplay;