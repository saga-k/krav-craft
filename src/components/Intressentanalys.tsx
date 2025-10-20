import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Intressent {
  id?: number;
  intressent: string;
  roll: string;
  behov: string;
  forvantningar: string;
  inflytande: string;
  intresse: string;
  __isNew: boolean;
}

export const Intressentanalys = () => {
  const [intressenter, setIntressenter] = useState<Intressent[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getIntressenter();
      setIntressenter(result || []);
    } catch (error) {
      console.error("Fel vid laddning:", error);
      setIntressenter([]);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveIntressenter(intressenter);
      toast({ title: "Sparat!", description: "Intressentanalys har sparats." });
    } catch (error) {
      console.error("Sparfel:", error);
      toast({
        title: "Fel",
        description: "Kunde inte spara data.",
        variant: "destructive",
      });
    }
  };

  const addRow = () => {
    setIntressenter([
      ...intressenter,
      {
        intressent: "",
        roll: "",
        behov: "",
        forvantningar: "",
        inflytande: "medel",
        intresse: "medel",
        __isNew: true, // markör för ny rad
      },
    ]);
  };

  const removeRow = (id: number) => {
    setIntressenter(intressenter.filter((i) => i.id !== id));
  };

  const updateRow = (id: number, field: keyof Intressent, value: string) => {
    setIntressenter(
      intressenter.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Intressentanalys</CardTitle>
          <Button onClick={addRow} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Lägg till rad
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Intressent</th>
                  <th className="text-left p-2 font-semibold">Roll</th>
                  <th className="text-left p-2 font-semibold">Behov</th>
                  <th className="text-left p-2 font-semibold">Förväntningar</th>
                  <th className="text-left p-2 font-semibold">Inflytande</th>
                  <th className="text-left p-2 font-semibold">Intresse</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {intressenter.map((intressent) => (
                  <tr key={intressent.id} className="border-b">
                    <td className="p-2">
                      <Input
                        value={intressent.intressent}
                        onChange={(e) =>
                          updateRow(intressent.id, "intressent", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={intressent.roll}
                        onChange={(e) =>
                          updateRow(intressent.id, "roll", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={intressent.behov}
                        onChange={(e) =>
                          updateRow(intressent.id, "behov", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={intressent.forvantningar}
                        onChange={(e) =>
                          updateRow(
                            intressent.id,
                            "forvantningar",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        value={intressent.inflytande}
                        onValueChange={(value) =>
                          updateRow(intressent.id, "inflytande", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="låg">Låg</SelectItem>
                          <SelectItem value="medel">Medel</SelectItem>
                          <SelectItem value="hög">Hög</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Select
                        value={intressent.intresse}
                        onValueChange={(value) =>
                          updateRow(intressent.id, "intresse", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="låg">Låg</SelectItem>
                          <SelectItem value="medel">Medel</SelectItem>
                          <SelectItem value="hög">Hög</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRow(intressent.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Spara Intressentanalys
      </Button>
    </div>
  );
};
