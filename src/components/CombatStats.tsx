import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CombatStatsProps {
  hitPoints: number;
  setHitPoints: (hp: number) => void;
  maxHitPoints: number;
  setMaxHitPoints: (maxHp: number) => void;
  armorClass: number;
  setArmorClass: (ac: number) => void;
  proficiencyBonus: number;
  setProficiencyBonus: (bonus: number) => void;
}

export function CombatStats({
  hitPoints,
  setHitPoints,
  maxHitPoints,
  setMaxHitPoints,
  armorClass,
  setArmorClass,
  proficiencyBonus,
  setProficiencyBonus
}: CombatStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Combat Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hitPoints">Hit Points</Label>
            <div className="flex gap-2">
              <Input
                id="hitPoints"
                type="number"
                value={hitPoints || ''}
                onChange={(e) => setHitPoints(parseInt(e.target.value) || 0)}
                min={0}
                placeholder="Current"
              />
              <span className="self-center">/</span>
              <Input
                type="number"
                value={maxHitPoints || ''}
                onChange={(e) => setMaxHitPoints(parseInt(e.target.value) || 0)}
                min={0}
                placeholder="Max"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="armorClass">Armor Class</Label>
            <Input
              id="armorClass"
              type="number"
              value={armorClass || ''}
              onChange={(e) => setArmorClass(parseInt(e.target.value) || 10)}
              min={0}
            />
          </div>
          <div>
            <Label htmlFor="proficiencyBonus">Proficiency Bonus</Label>
            <Input
              id="proficiencyBonus"
              type="number"
              value={proficiencyBonus || ''}
              onChange={(e) => setProficiencyBonus(parseInt(e.target.value) || 2)}
              min={1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}