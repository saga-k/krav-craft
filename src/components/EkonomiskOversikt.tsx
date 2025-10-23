import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const EkonomiskOversikt = () => {
  const [data, setData] = useState({
    utvecklingskostnader: "",
    licenser: "",
    integration: "",
    drift: "",
    underhall: "",
    support: "",
    antaganden: "",
    besparingar: "",
  });

  const handleSave = () => {
    localStorage.setItem("ekonomiskoversikt", JSON.stringify(data));
    toast({ title: "Sparat!", description: "Ekonomisk översikt har sparats." });
  };

  useEffect(() => {
    const saved = localStorage.getItem("ekonomiskoversikt");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ekonomisk översikt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Utvecklingskostnader
            </label>
            <Textarea
              value={data.utvecklingskostnader}
              onChange={(e) =>
                setData({ ...data, utvecklingskostnader: e.target.value })
              }
              placeholder="Kostnader för utveckling..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Licenser</label>
            <Textarea
              value={data.licenser}
              onChange={(e) => setData({ ...data, licenser: e.target.value })}
              placeholder="Licenskostnader..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Integration
            </label>
            <Textarea
              value={data.integration}
              onChange={(e) =>
                setData({ ...data, integration: e.target.value })
              }
              placeholder="Kostnader för integrationer..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Drift och underhåll
            </label>
            <Textarea
              value={data.drift}
              onChange={(e) => setData({ ...data, drift: e.target.value })}
              placeholder="Löpande driftkostnader..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Underhållskostnader
            </label>
            <Textarea
              value={data.underhall}
              onChange={(e) => setData({ ...data, underhall: e.target.value })}
              placeholder="Kostnader för underhåll..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Support</label>
            <Textarea
              value={data.support}
              onChange={(e) => setData({ ...data, support: e.target.value })}
              placeholder="Supportkostnader..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Antaganden
            </label>
            <Textarea
              value={data.antaganden}
              onChange={(e) => setData({ ...data, antaganden: e.target.value })}
              placeholder="Viktiga antaganden för budgeten..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Möjliga besparingar
            </label>
            <Textarea
              value={data.besparingar}
              onChange={(e) =>
                setData({ ...data, besparingar: e.target.value })
              }
              placeholder="Identifierade besparingsmöjligheter..."
              rows={3}
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
