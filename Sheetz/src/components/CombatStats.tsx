import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Swords } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

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
  const [isDamageDialogOpen, setIsDamageDialogOpen] = useState(false);
  const [isHealDialogOpen, setIsHealDialogOpen] = useState(false);
  const [damageAmount, setDamageAmount] = useState("");
  const [healAmount, setHealAmount] = useState("");

  const handleDamage = () => {
    const damage = parseInt(damageAmount) || 0;
    const newHp = Math.max(0, hitPoints - damage);
    setHitPoints(newHp);
    setDamageAmount("");
    setIsDamageDialogOpen(false);
  };

  const handleHeal = () => {
    const healing = parseInt(healAmount) || 0;
    const newHp = Math.min(maxHitPoints, hitPoints + healing);
    setHitPoints(newHp);
    setHealAmount("");
    setIsHealDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords className="h-5 w-5"/>
          Combat Stats
        </CardTitle>
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
        <br></br>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-red-600"
            onClick={() => setIsDamageDialogOpen(true)}
          >
            I've been hit!
          </Button>
          <Button 
            variant="outline" 
            className="text-green-600"
            onClick={() => setIsHealDialogOpen(true)}
          >
            I've been healed!
          </Button>
        </div>
      </CardContent>

      {/* Damage Dialog */}
      <Dialog open={isDamageDialogOpen} onOpenChange={setIsDamageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Take Damage</DialogTitle>
            <DialogDescription>
              How much damage did you take?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="damage">Damage Amount</Label>
            <Input
              id="damage"
              type="number"
              value={damageAmount}
              onChange={(e) => setDamageAmount(e.target.value)}
              min={0}
              placeholder="Enter damage amount"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDamage();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDamageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDamage}>
              Apply Damage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Heal Dialog */}
      <Dialog open={isHealDialogOpen} onOpenChange={setIsHealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Heal</DialogTitle>
            <DialogDescription>
              How much healing did you receive?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="heal">Healing Amount</Label>
            <Input
              id="heal"
              type="number"
              value={healAmount}
              onChange={(e) => setHealAmount(e.target.value)}
              min={0}
              placeholder="Enter healing amount"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleHeal();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHealDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleHeal}>
              Apply Healing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}