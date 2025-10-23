import { useState, useEffect } from "react";
import { CharacterInfo } from "./components/CharacterInfo";
import { CharacterPicture } from "./components/CharacterPicture";
import { AbilityScore } from "./components/AbilityScore";
import { CombatStats } from "./components/CombatStats";
import { Inventory } from "./components/Inventory";
import { Wealth } from "./components/Wealth";
import { Resources } from "./components/Resources";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Moon, Sun, ChartColumn, BicepsFlexed, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function App() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Lock state for character info
  const [isCharacterLocked, setIsCharacterLocked] = useState(false);

  

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

  const handleClearCharacter = () => {
    // Reset character info
    setCharacterName("");
    setCharacterClass("");
    setRace("");
    setLevel(1);
    
    // Reset ability scores
    setStrength(10);
    setDexterity(10);
    setConstitution(10);
    setIntelligence(10);
    setWisdom(10);
    setCharisma(10);
    
    // Reset combat stats
    setHitPoints(8);
    setMaxHitPoints(8);
    setArmorClass(10);
    setProficiencyBonus(2);
    
    // Reset inventory
    setInventoryItems([]);
    
    // Reset character picture
    setCharacterImageUrl(null);
    
    // Reset wealth
    setCopper(0);
    setSilver(0);
    setElectrum(0);
    setGold(0);
    setPlatinum(0);
    
    // Reset lock state
    setIsCharacterLocked(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="flex-1 text-center font-bold">Sheetz</h1>
        </div>
        <div className="flex items-center ">
          <p className="flex-1 text-center text-[0.7rem]">A minimalistic DND character sheet.</p>
          
        </div>
                <div className="flex items-center gap-2 justify-center">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        
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
              isLocked={isCharacterLocked}
              setIsLocked={setIsCharacterLocked}
            />
          </div>
          <div className="lg:col-span-1">
            <CharacterPicture
              imageUrl={characterImageUrl}
              setImageUrl={setCharacterImageUrl}
              isLocked={isCharacterLocked}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ability Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartColumn className="h-5 w-5"/>
                Ability Scores</CardTitle>
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

        {/* Clear Character Button */}
        <div className="flex justify-center pb-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Clear Character
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all character data including stats, inventory, and wealth. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearCharacter}>
                  Clear Character
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}