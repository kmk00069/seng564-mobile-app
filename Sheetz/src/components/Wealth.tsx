import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Coins } from "lucide-react";

interface WealthProps {
  copper: number;
  setCoppper: (value: number) => void;
  silver: number;
  setSilver: (value: number) => void;
  electrum: number;
  setElectrum: (value: number) => void;
  gold: number;
  setGold: (value: number) => void;
  platinum: number;
  setPlatinum: (value: number) => void;
}

export function Wealth({
  copper,
  setCoppper,
  silver,
  setSilver,
  electrum,
  setElectrum,
  gold,
  setGold,
  platinum,
  setPlatinum
}: WealthProps) {
  // Calculate total wealth in gold pieces for reference
  const totalInGold = (
    copper * 0.01 +
    silver * 0.1 +
    electrum * 0.5 +
    gold * 1 +
    platinum * 10
  ).toFixed(2);

  // Quick conversion function to convert everything to gold
  const convertToGold = () => {
    const totalGold = Math.floor(
      copper * 0.01 +
      silver * 0.1 +
      electrum * 0.5 +
      gold +
      platinum * 10
    );
    
    setGold(totalGold);
    setCoppper(0);
    setSilver(0);
    setElectrum(0);
    setPlatinum(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Character Wealth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Coin Types */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="platinum" className="text-purple-600">Platinum (pp)</Label>
              <Input
                id="platinum"
                type="number"
                value={platinum || ''}
                onChange={(e) => setPlatinum(parseInt(e.target.value) || 0)}
                min={0}
                className="text-center"
              />
            </div>
            
            <div>
              <Label htmlFor="gold" className="text-yellow-600">Gold (gp)</Label>
              <Input
                id="gold"
                type="number"
                value={gold || ''}
                onChange={(e) => setGold(parseInt(e.target.value) || 0)}
                min={0}
                className="text-center"
              />
            </div>
            
            <div>
              <Label htmlFor="electrum" className="text-green-600">Electrum (ep)</Label>
              <Input
                id="electrum"
                type="number"
                value={electrum || ''}
                onChange={(e) => setElectrum(parseInt(e.target.value) || 0)}
                min={0}
                className="text-center"
              />
            </div>
            
            <div>
              <Label htmlFor="silver" className="text-gray-500">Silver (sp)</Label>
              <Input
                id="silver"
                type="number"
                value={silver || ''}
                onChange={(e) => setSilver(parseInt(e.target.value) || 0)}
                min={0}
                className="text-center"
              />
            </div>
            
            <div>
              <Label htmlFor="copper" className="text-orange-600">Copper (cp)</Label>
              <Input
                id="copper"
                type="number"
                value={copper || ''}
                onChange={(e) => setCoppper(parseInt(e.target.value) || 0)}
                min={0}
                className="text-center"
              />
            </div>
          </div>

          {/* Total and Conversion */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-muted-foreground">
              <span>Total Value: </span>
              <span className="text-yellow-600">{totalInGold} gp</span>
            </div>
            <Button 
              onClick={convertToGold} 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              Convert All to Gold
            </Button>
          </div>

          {/* Currency Conversion Reference */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
            <div className="mb-1">Currency Conversion:</div>
            <div className="grid grid-cols-2 gap-1">
              <span>1 pp = 10 gp</span>
              <span>1 gp = 10 sp</span>
              <span>1 ep = 5 sp</span>
              <span>1 sp = 10 cp</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}