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

interface Risk {
  id?: number;
  krav: string;
  konsekvens: string;
  sannolikhet: string;
  forebygga: string;
  atgard: string;
  __isNew: boolean;
}

export const Riskanalys = () => {
  const [risker, setRisker] = useState<Risk[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getRiskanalys();
      setRisker(result);
    } catch (error) {
      console.error("Fel vid laddning:", error);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveRiskanalys(risker);
      toast({ title: "Sparat!", description: "Riskanalys har sparats." });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara data.",
        variant: "destructive",
      });
    }
  };

  const addRow = () => {
    setRisker([
      ...risker,
      {
        krav: "",
        konsekvens: "3",
        sannolikhet: "3",
        forebygga: "",
        atgard: "",
        __isNew: true, // markör för ny rad
      },
    ]);
  };

  const removeRow = (id: number) => {
    setRisker(risker.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: keyof Risk, value: string) => {
    setRisker(risker.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Riskanalys</CardTitle>
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
                  <th className="text-left p-2 font-semibold">Krav</th>
                  <th className="text-left p-2 font-semibold w-32">
                    Konsekvens (1-5)
                  </th>
                  <th className="text-left p-2 font-semibold w-32">
                    Sannolikhet (1-5)
                  </th>
                  <th className="text-left p-2 font-semibold">
                    Åtgärd för att förebygga
                  </th>
                  <th className="text-left p-2 font-semibold">
                    Åtgärd ifall det händer
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {risker.map((risk) => (
                  <tr key={risk.id} className="border-b">
                    <td className="p-2">
                      <Input
                        value={risk.krav}
                        onChange={(e) =>
                          updateRow(risk.id, "krav", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        value={risk.konsekvens}
                        onValueChange={(value) =>
                          updateRow(risk.id, "konsekvens", value)
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
                    </td>
                    <td className="p-2">
                      <Select
                        value={risk.sannolikhet}
                        onValueChange={(value) =>
                          updateRow(risk.id, "sannolikhet", value)
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
                    </td>
                    <td className="p-2">
                      <Input
                        value={risk.forebygga}
                        onChange={(e) =>
                          updateRow(risk.id, "forebygga", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={risk.atgard}
                        onChange={(e) =>
                          updateRow(risk.id, "atgard", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRow(risk.id)}
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
        Spara Riskanalys
      </Button>
    </div>
  );
};
