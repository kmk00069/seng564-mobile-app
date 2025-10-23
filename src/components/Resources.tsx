import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, BookOpen, Sparkles } from "lucide-react";

interface ResourcesProps {
  selectedClass?: string;
}

export function Resources({ selectedClass }: ResourcesProps) {
  const classGuideMap: Record<string, string> = {
    "Artificer": "https://www.dndbeyond.com/classes/artificer",
    "Barbarian": "https://www.dndbeyond.com/classes/barbarian",
    "Bard": "https://www.dndbeyond.com/classes/bard",
    "Cleric": "https://www.dndbeyond.com/classes/cleric",
    "Druid": "https://www.dndbeyond.com/classes/druid",
    "Fighter": "https://www.dndbeyond.com/classes/fighter",
    "Monk": "https://www.dndbeyond.com/classes/monk",
    "Paladin": "https://www.dndbeyond.com/classes/paladin",
    "Ranger": "https://www.dndbeyond.com/classes/ranger",
    "Rogue": "https://www.dndbeyond.com/classes/rogue",
    "Sorcerer": "https://www.dndbeyond.com/classes/sorcerer",
    "Warlock": "https://www.dndbeyond.com/classes/warlock",
    "Wizard": "https://www.dndbeyond.com/classes/wizard"
  };

  const selectedClassGuide = selectedClass ? classGuideMap[selectedClass] : null;

  const spellResources = [
    { name: "All Spells List", url: "https://www.dndbeyond.com/spells" },
    { name: "Spells by Class", url: "https://www.dndbeyond.com/spells/class" },
    { name: "Spells by Level", url: "https://www.dndbeyond.com/spells?filter-level=0&filter-level=1&filter-level=2&filter-level=3&filter-level=4&filter-level=5&filter-level=6&filter-level=7&filter-level=8&filter-level=9" },
    { name: "Cantrips", url: "https://www.dndbeyond.com/spells?filter-level=0" }
  ];

  const generalResources = [
    { name: "Basic Rules (Free)", url: "https://www.dndbeyond.com/sources/basic-rules" },
    { name: "Character Creation Guide", url: "https://www.dndbeyond.com/posts/1368-how-to-create-your-first-dungeons-dragons" },
    { name: "Equipment & Gear", url: "https://www.dndbeyond.com/equipment" },
    { name: "Races Guide", url: "https://www.dndbeyond.com/races" }
  ];

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          D&D Resources & Guides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Selected Class Guide */}
          {selectedClass && selectedClassGuide && (
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {selectedClass} Class Guide
              </h4>
              <Button
                variant="default"
                onClick={() => openLink(selectedClassGuide)}
                className="w-full"
              >
                View {selectedClass} Guide on D&D Beyond
              </Button>
            </div>
          )}

          {!selectedClass && (
            <div className="text-center py-4 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Select a class above to see the class guide</p>
            </div>
          )}

          {/* Spell Resources */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Spell Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {spellResources.map((resource) => (
                <Button
                  key={resource.name}
                  variant="outline"
                  size="sm"
                  onClick={() => openLink(resource.url)}
                  className="justify-start h-8 text-xs"
                >
                  {resource.name}
                </Button>
              ))}
            </div>
          </div>

          {/* General Resources */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              General Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {generalResources.map((resource) => (
                <Button
                  key={resource.name}
                  variant="outline"
                  size="sm"
                  onClick={() => openLink(resource.url)}
                  className="justify-start h-8 text-xs"
                >
                  {resource.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            <p>All links open in a new tab and lead to D&D Beyond, the official digital toolset for D&D 5th Edition.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}