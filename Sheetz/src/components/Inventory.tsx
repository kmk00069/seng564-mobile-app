import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2, Plus, Backpack } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryProps {
  items: InventoryItem[];
  setItems: (items: InventoryItem[]) => void;
}

export function Inventory({ items, setItems }: InventoryProps) {
  const [newItemName, setNewItemName] = useState("");

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: newItemName,
        quantity: 1
      };
      setItems([...items, newItem]);
      setNewItemName("");
    }
  };

  const updateItem = (id: string, field: 'name' | 'quantity', value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Backpack className="h-5 w-5" />
          Inventory & Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add new item..."
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <Button onClick={addItem} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-2 items-center">
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  className="w-20"
                  min={1}
                />
                <Button 
                  onClick={() => removeItem(item.id)} 
                  size="icon" 
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {items.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No items yet. Add some equipment!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}