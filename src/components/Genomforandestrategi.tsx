import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";

export const Genomforandestrategi = () => {
  const [data, setData] = useState({
    utvecklingsmetod: "",
    iterationer: "",
    leveranser: "",
    testning: "",
    figma: "",
    poc: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getGenomforandestrategi();
      setData(result);
    } catch (error) {
      console.error("Fel vid laddning:", error);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveGenomforandestrategi(data);
      toast({ title: "Sparat!", description: "Genomförandestrategi har sparats." });
    } catch (error) {
      toast({ title: "Fel", description: "Kunde inte spara data.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Genomförandestrategi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Vald utvecklingsmetod
            </label>
            <Textarea
              value={data.utvecklingsmetod}
              onChange={(e) =>
                setData({ ...data, utvecklingsmetod: e.target.value })
              }
              placeholder="T.ex. Scrum, Kanban, Vattenfall..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Iterationer och sprintar
            </label>
            <Textarea
              value={data.iterationer}
              onChange={(e) =>
                setData({ ...data, iterationer: e.target.value })
              }
              placeholder="Hur iterationer planeras..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Leveranser
            </label>
            <Textarea
              value={data.leveranser}
              onChange={(e) =>
                setData({ ...data, leveranser: e.target.value })
              }
              placeholder="Planerade leveranser och milstolpar..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Teststrategi
            </label>
            <Textarea
              value={data.testning}
              onChange={(e) => setData({ ...data, testning: e.target.value })}
              placeholder="Hur testning ska genomföras..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Figma/Design
            </label>
            <Textarea
              value={data.figma}
              onChange={(e) => setData({ ...data, figma: e.target.value })}
              placeholder="Länk till Figma eller designbeskrivning..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Proof of Concept
            </label>
            <Textarea
              value={data.poc}
              onChange={(e) => setData({ ...data, poc: e.target.value })}
              placeholder="Beskrivning av eventuell PoC..."
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
