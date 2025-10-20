import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { toast } from "@/hooks/use-toast";

export const ProjektDirektiv = () => {
  const [data, setData] = useState<any>({
    projektledare: "",
    datum: "",
    budget: "1,5 MSEK",
    tidsram: "3 veckor",
    bakgrund: "",
    mal_overgripande: "",
    delmal: "",
    omfattning_ingar: "",
    omfattning_ingar_inte: "",
    affarsnytta_kvant: "",
    affarsnytta_kval: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getProjektdirektiv();
      setData(result);
    } catch (error) {
      console.error("Fel vid laddning:", error);
    }
  };

  const handleSave = async () => {
    console.log(data);
    try {
      await api.saveProjektdirektiv(data);
      toast({ title: "Sparat!", description: "Projektdirektiv har sparats." });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projektinformation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Projektledare</Label>
              <Input
                value={data.projektledare}
                onChange={(e) =>
                  setData({ ...data, projektledare: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Datum</Label>
              <Input
                type="date"
                value={data.datum}
                onChange={(e) => setData({ ...data, datum: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Budget</Label>
              <Input value={data.budget} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>Tidsram</Label>
              <Input
                value={data.tidsram}
                onChange={(e) => setData({ ...data, tidsram: e.target.value })}
                placeholder="3 veckor"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bakgrund och problembeskrivning</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.bakgrund}
            onChange={(e) => setData({ ...data, bakgrund: e.target.value })}
            placeholder="Beskriv nuläget och varför projektet behövs"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projektmål</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Övergripande mål</Label>
            <Textarea
              value={data.mal_overgripande}
              onChange={(e) =>
                setData({ ...data, mal_overgripande: e.target.value })
              }
              rows={3}
            />
          </div>
          <div>
            <Label>Delmål</Label>
            <Textarea
              value={data.delmal}
              onChange={(e) => setData({ ...data, delmal: e.target.value })}
              placeholder="Lista 3-5 konkreta delmål"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Omfattning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Ingår i projektet</Label>
            <Textarea
              value={data.omfattning_ingar}
              onChange={(e) =>
                setData({ ...data, omfattning_ingar: e.target.value })
              }
              rows={3}
            />
          </div>
          <div>
            <Label>Ingår INTE (Avgränsningar)</Label>
            <Textarea
              value={data.omfattning_ingar_inte}
              onChange={(e) =>
                setData({ ...data, omfattning_ingar_inte: e.target.value })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Affärsnytta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Kvantitativa fördelar</Label>
            <Textarea
              value={data.affarsnytta_kvant}
              onChange={(e) =>
                setData({ ...data, affarsnytta_kvant: e.target.value })
              }
              placeholder="t.ex. Minska admin 10h/vecka"
              rows={3}
            />
          </div>
          <div>
            <Label>Kvalitativa fördelar</Label>
            <Textarea
              value={data.affarsnytta_kval}
              onChange={(e) =>
                setData({ ...data, affarsnytta_kval: e.target.value })
              }
              placeholder="t.ex. Förbättrad kundupplevelse"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Spara Projektdirektiv
      </Button>
    </div>
  );
};
