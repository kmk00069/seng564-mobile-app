import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface AbilityScoreProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function AbilityScore({ label, value, onChange }: AbilityScoreProps) {
  // Calculate modifier from ability score
  const modifier = Math.floor((value - 10) / 2);
  const modifierText = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <Card className="w-20">
      <CardContent className="p-2 text-center">
        <div className="mb-1 uppercase tracking-wide">{label}</div>
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="h-12 text-center mb-2"
          min={1}
          max={20}
        />
        <div className="bg-secondary rounded px-2 py-1">
          {modifierText}
        </div>
      </CardContent>
    </Card>
  );
}