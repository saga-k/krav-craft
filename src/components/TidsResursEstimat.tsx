import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const TidsResursEstimat = () => {
  const [data, setData] = useState({
    tidsuppskattning: "",
    kostnadsuppskattning: "",
    kompetensbehov: "",
    faser: "",
    beroenden: "",
    milstolpar: "",
  });

  const handleSave = () => {
    localStorage.setItem("tidsresursestimat", JSON.stringify(data));
    toast({ title: "Sparat!", description: "Tids- och resursestimat har sparats." });
  };

  useEffect(() => {
    const saved = localStorage.getItem("tidsresursestimat");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tids- och resursestimat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Tidsuppskattning
            </label>
            <Textarea
              value={data.tidsuppskattning}
              onChange={(e) =>
                setData({ ...data, tidsuppskattning: e.target.value })
              }
              placeholder="Uppskattad projekttid..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Kostnadsuppskattning
            </label>
            <Textarea
              value={data.kostnadsuppskattning}
              onChange={(e) =>
                setData({ ...data, kostnadsuppskattning: e.target.value })
              }
              placeholder="Uppskattade kostnader..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Kompetensbehov
            </label>
            <Textarea
              value={data.kompetensbehov}
              onChange={(e) =>
                setData({ ...data, kompetensbehov: e.target.value })
              }
              placeholder="Vilka kompetenser behövs..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Planerade faser/sprintar
            </label>
            <Textarea
              value={data.faser}
              onChange={(e) => setData({ ...data, faser: e.target.value })}
              placeholder="Beskrivning av faser och sprintar..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Beroenden mellan aktiviteter
            </label>
            <Textarea
              value={data.beroenden}
              onChange={(e) => setData({ ...data, beroenden: e.target.value })}
              placeholder="Beroenden och förutsättningar..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Kritiska milstolpar
            </label>
            <Textarea
              value={data.milstolpar}
              onChange={(e) => setData({ ...data, milstolpar: e.target.value })}
              placeholder="Viktiga milstolpar i projektet..."
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
