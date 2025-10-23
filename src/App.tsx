import { useState } from "react";
import { CharacterInfo } from "./components/CharacterInfo";
import { CharacterPicture } from "./components/CharacterPicture";
import { AbilityScore } from "./components/AbilityScore";
import { CombatStats } from "./components/CombatStats";
import { Inventory } from "./components/Inventory";
import { Wealth } from "./components/Wealth";
import { Resources } from "./components/Resources";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function App() {
  // Character basic info
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(1);

  // Ability scores
  const [strength, setStrength] = useState(10);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(10);
  const [intelligence, setIntelligence] = useState(10);
  const [wisdom, setWisdom] = useState(10);
  const [charisma, setCharisma] = useState(10);

  // Combat stats
  const [hitPoints, setHitPoints] = useState(8);
  const [maxHitPoints, setMaxHitPoints] = useState(8);
  const [armorClass, setArmorClass] = useState(10);
  const [proficiencyBonus, setProficiencyBonus] = useState(2);

  // Inventory
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  // Character picture
  const [characterImageUrl, setCharacterImageUrl] = useState<string | null>(null);

  // Wealth tracking
  const [copper, setCopper] = useState(0);
  const [silver, setSilver] = useState(0);
  const [electrum, setElectrum] = useState(0);
  const [gold, setGold] = useState(0);
  const [platinum, setPlatinum] = useState(0);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-center mb-6">D&D Character Sheet</h1>
        
        {/* Character Information and Picture */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CharacterInfo
              characterName={characterName}
              setCharacterName={setCharacterName}
              characterClass={characterClass}
              setCharacterClass={setCharacterClass}
              race={race}
              setRace={setRace}
              level={level}
              setLevel={setLevel}
            />
          </div>
          <div className="lg:col-span-1">
            <CharacterPicture
              imageUrl={characterImageUrl}
              setImageUrl={setCharacterImageUrl}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ability Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Ability Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                <AbilityScore 
                  label="STR" 
                  value={strength} 
                  onChange={setStrength} 
                />
                <AbilityScore 
                  label="DEX" 
                  value={dexterity} 
                  onChange={setDexterity} 
                />
                <AbilityScore 
                  label="CON" 
                  value={constitution} 
                  onChange={setConstitution} 
                />
                <AbilityScore 
                  label="INT" 
                  value={intelligence} 
                  onChange={setIntelligence} 
                />
                <AbilityScore 
                  label="WIS" 
                  value={wisdom} 
                  onChange={setWisdom} 
                />
                <AbilityScore 
                  label="CHA" 
                  value={charisma} 
                  onChange={setCharisma} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Combat Stats */}
          <CombatStats
            hitPoints={hitPoints}
            setHitPoints={setHitPoints}
            maxHitPoints={maxHitPoints}
            setMaxHitPoints={setMaxHitPoints}
            armorClass={armorClass}
            setArmorClass={setArmorClass}
            proficiencyBonus={proficiencyBonus}
            setProficiencyBonus={setProficiencyBonus}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Wealth */}
          <Wealth
            copper={copper}
            setCoppper={setCopper}
            silver={silver}
            setSilver={setSilver}
            electrum={electrum}
            setElectrum={setElectrum}
            gold={gold}
            setGold={setGold}
            platinum={platinum}
            setPlatinum={setPlatinum}
          />

          {/* Inventory */}
          <Inventory
            items={inventoryItems}
            setItems={setInventoryItems}
          />
        </div>

        {/* Resources */}
        <Resources selectedClass={characterClass} />
      </div>
    </div>
  );
}