import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CharacterInfoProps {
  characterName: string;
  setCharacterName: (name: string) => void;
  characterClass: string;
  setCharacterClass: (className: string) => void;
  race: string;
  setRace: (race: string) => void;
  level: number;
  setLevel: (level: number) => void;
}

export function CharacterInfo({
  characterName,
  setCharacterName,
  characterClass,
  setCharacterClass,
  race,
  setRace,
  level,
  setLevel
}: CharacterInfoProps) {
  const dndClasses = [
    "Artificer",
    "Barbarian", 
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Character Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name"
            />
          </div>
          <div>
            <Label htmlFor="class">Class</Label>
            <Select value={characterClass} onValueChange={setCharacterClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {dndClasses.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="race">Race</Label>
            <Input
              id="race"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              placeholder="e.g., Human, Elf"
            />
          </div>
          <div>
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              type="number"
              value={level || ''}
              onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
              min={1}
              max={20}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}