import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";

export const KvalitetOppfoljning = () => {
  const [data, setData] = useState({
    kodstandarder: "",
    teststrategi: "",
    versionshantering: "",
    dokumentation: "",
    matpunkter: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getKvalitetoppfoljning();
      setData(result);
    } catch (error) {
      console.error("Fel vid laddning:", error);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveKvalitetoppfoljning(data);
      toast({ title: "Sparat!", description: "Kvalitet och uppföljning har sparats." });
    } catch (error) {
      toast({ title: "Fel", description: "Kunde inte spara data.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kvalitet och uppföljning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Kodstandarder
            </label>
            <Textarea
              value={data.kodstandarder}
              onChange={(e) =>
                setData({ ...data, kodstandarder: e.target.value })
              }
              placeholder="Vilka kodstandarder ska följas..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Teststrategi
            </label>
            <Textarea
              value={data.teststrategi}
              onChange={(e) =>
                setData({ ...data, teststrategi: e.target.value })
              }
              placeholder="Hur testning ska genomföras och säkerställas..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Versionshantering
            </label>
            <Textarea
              value={data.versionshantering}
              onChange={(e) =>
                setData({ ...data, versionshantering: e.target.value })
              }
              placeholder="Git-strategi, branching, releases..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Dokumentation
            </label>
            <Textarea
              value={data.dokumentation}
              onChange={(e) =>
                setData({ ...data, dokumentation: e.target.value })
              }
              placeholder="Hur dokumentation ska skapas och underhållas..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Mätpunkter för framdrift
            </label>
            <Textarea
              value={data.matpunkter}
              onChange={(e) => setData({ ...data, matpunkter: e.target.value })}
              placeholder="KPI:er och mätetal för att följa projektets framsteg..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Spara
      </Button>
    </div>
  );
};
