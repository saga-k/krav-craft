import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

interface Persona {
  id?: number;
  namn: string;
  alder: string;
  yrke: string;
  teknisk_kunskap: string;
  mal: string;
  frustrationer: string;
  behov: string;
  citat: string;
  __isNew: boolean;
}

export const Personas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getPersonas();
      setPersonas(result || []);
    } catch (error) {
      console.error("Fel vid laddning:", error);
      setPersonas([]);
    }
  };

  const handleSave = async () => {
    try {
      const saved = await api.savePersonas(personas);
      setPersonas(saved); // nu får alla nya personas sina riktiga id
      toast({ title: "Sparat!", description: "Personas har sparats." });
    } catch (error) {
      console.error("Sparfel:", error);
      toast({
        title: "Fel",
        description: "Kunde inte spara data.",
        variant: "destructive",
      });
    }
  };

  const addPersona = () => {
    setPersonas([
      ...personas,
      {
        // OBS: inget id
        namn: "",
        alder: "",
        yrke: "",
        teknisk_kunskap: "3",
        mal: "",
        frustrationer: "",
        behov: "",
        citat: "",
        __isNew: true, // markör så vi vet att detta är en ny post
      },
    ]);
  };

  const removePersona = (id: number) => {
    setPersonas(personas.filter((p) => p.id !== id));
  };

  const updatePersona = (id: number, field: keyof Persona, value: string) => {
    setPersonas(
      personas.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personas</h2>
        <Button onClick={addPersona}>
          <Plus className="w-4 h-4 mr-2" />
          Lägg till persona
        </Button>
      </div>

      {personas.map((persona) => (
        <Card key={persona.namn}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{persona.namn || "Ny Persona"}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePersona(persona.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Personanamn</Label>
              <Input
                value={persona.namn}
                onChange={(e) =>
                  updatePersona(persona.id, "namn", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ålder</Label>
                <Input
                  value={persona.alder}
                  onChange={(e) =>
                    updatePersona(persona.id, "alder", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Yrke</Label>
                <Input
                  value={persona.yrke}
                  onChange={(e) =>
                    updatePersona(persona.id, "yrke", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label>Teknisk kunskap (1-5)</Label>
              <Select
                value={persona.teknisk_kunskap}
                onValueChange={(value) =>
                  updatePersona(persona.id, "teknisk_kunskap", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Mycket låg</SelectItem>
                  <SelectItem value="2">2 - Låg</SelectItem>
                  <SelectItem value="3">3 - Medel</SelectItem>
                  <SelectItem value="4">4 - Hög</SelectItem>
                  <SelectItem value="5">5 - Mycket hög</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Mål</Label>
              <Textarea
                value={persona.mal}
                onChange={(e) =>
                  updatePersona(persona.id, "mal", e.target.value)
                }
                placeholder="Lista 3-5 mål denna persona har"
                rows={3}
              />
            </div>

            <div>
              <Label>Frustrationer/Problem</Label>
              <Textarea
                value={persona.frustrationer}
                onChange={(e) =>
                  updatePersona(persona.id, "frustrationer", e.target.value)
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Behov från bokningssystemet</Label>
              <Textarea
                value={persona.behov}
                onChange={(e) =>
                  updatePersona(persona.id, "behov", e.target.value)
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Citat</Label>
              <Textarea
                value={persona.citat}
                onChange={(e) =>
                  updatePersona(persona.id, "citat", e.target.value)
                }
                placeholder="Ett representativt citat från denna persona"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {personas.length > 0 && (
        <Button onClick={handleSave} className="w-full">
          Spara Personas
        </Button>
      )}
    </div>
  );
};
