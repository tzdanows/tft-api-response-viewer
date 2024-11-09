import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

interface TFTMatch {
  metadata: Metadata;
  info: MatchInfo;
}

interface Metadata {
  data_version: string;
  match_id: string;
  participants: string[];
}

interface MatchInfo {
  game_datetime: number;
  game_length: number;
  game_version: string;
  participants: Participant[];
  queue_id: number;
  tft_game_type: string;
  tft_set_core_name: string;
  tft_set_number: number;
}

interface Participant {
  augments: string[];
  companion: Companion;
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

interface Companion {
  content_ID: string;
  item_ID: number;
  skin_ID: number;
  species: string;
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