import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const RekommendationNastaSteg = () => {
  const [data, setData] = useState({
    sammanfattning: "",
    rekommendation: "",
    beslutspunkter: "",
    fordjupning: "",
  });

  const handleSave = () => {
    localStorage.setItem("rekommendation", JSON.stringify(data));
    toast({ title: "Sparat!", description: "Rekommendation har sparats." });
  };

  useEffect(() => {
    const saved = localStorage.getItem("rekommendation");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rekommendation och nästa steg</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Sammanfattning av slutsatser
            </label>
            <Textarea
              value={data.sammanfattning}
              onChange={(e) =>
                setData({ ...data, sammanfattning: e.target.value })
              }
              placeholder="Sammanfatta de viktigaste slutsatserna från projektet..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Rekommendation
            </label>
            <Textarea
              value={data.rekommendation}
              onChange={(e) =>
                setData({ ...data, rekommendation: e.target.value })
              }
              placeholder="Ge en tydlig rekommendation: gå vidare, pausa, komplettera eller avbryta..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Nästa beslutspunkter
            </label>
            <Textarea
              value={data.beslutspunkter}
              onChange={(e) =>
                setData({ ...data, beslutspunkter: e.target.value })
              }
              placeholder="Lista beslutspunkter och milstolpar framåt..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Områden för fördjupningsfokus
            </label>
            <Textarea
              value={data.fordjupning}
              onChange={(e) =>
                setData({ ...data, fordjupning: e.target.value })
              }
              placeholder="Identifiera områden som behöver ytterligare analys eller fokus..."
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
