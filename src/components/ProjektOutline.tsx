import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export const ProjektOutline = () => {
  const [data, setData] = useState<any>({
    studio: { lokaler: 2, oppettider: '', placering: '' },
    personal: { instruktorer: 5, admin: 2 },
    verksamhet: { klasser: 30, kapacitet: 12, kunder: 200, klasstyper: '' },
    ekonomi: { priser: '' },
    nulage: { bokning: '', bra: '', daligt: '' }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getProjektoutline();
      setData(result);
    } catch (error) {
      console.error('Fel vid laddning:', error);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveProjektoutline(data);
      toast({ title: 'Sparat!', description: 'Projektoutline har sparats.' });
    } catch (error) {
      toast({ title: 'Fel', description: 'Kunde inte spara data.', variant: 'destructive' });
    }
  };

  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Studio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Antal studiolokaler</Label>
            <Input
              type="number"
              value={data.studio.lokaler}
              onChange={(e) => updateField('studio', 'lokaler', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Öppettider</Label>
            <Input
              value={data.studio.oppettider}
              onChange={(e) => updateField('studio', 'oppettider', e.target.value)}
              placeholder="Mån-Fre 06:00-21:00"
            />
          </div>
          <div>
            <Label>Geografisk placering</Label>
            <Input
              value={data.studio.placering}
              onChange={(e) => updateField('studio', 'placering', e.target.value)}
              placeholder="Södermalm, Stockholm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Antal instruktörer</Label>
            <Input
              type="number"
              value={data.personal.instruktorer}
              onChange={(e) => updateField('personal', 'instruktorer', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Antal administratörer</Label>
            <Input
              type="number"
              value={data.personal.admin}
              onChange={(e) => updateField('personal', 'admin', Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verksamhet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Antal klasser per vecka</Label>
            <Input
              type="number"
              value={data.verksamhet.klasser}
              onChange={(e) => updateField('verksamhet', 'klasser', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Max kapacitet per klass</Label>
            <Input
              type="number"
              value={data.verksamhet.kapacitet}
              onChange={(e) => updateField('verksamhet', 'kapacitet', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Antal aktiva kunder</Label>
            <Input
              type="number"
              value={data.verksamhet.kunder}
              onChange={(e) => updateField('verksamhet', 'kunder', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Typer av klasser</Label>
            <Textarea
              value={data.verksamhet.klasstyper}
              onChange={(e) => updateField('verksamhet', 'klasstyper', e.target.value)}
              placeholder="Hatha, Vinyasa, Yin..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ekonomi</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Prissättningsmodell</Label>
          <Textarea
            value={data.ekonomi.priser}
            onChange={(e) => updateField('ekonomi', 'priser', e.target.value)}
            placeholder="Drop-in: 150kr, 10-klippkort: 1200kr..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nuläge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Hur bokas klasser idag</Label>
            <Textarea
              value={data.nulage.bokning}
              onChange={(e) => updateField('nulage', 'bokning', e.target.value)}
            />
          </div>
          <div>
            <Label>Vad fungerar bra</Label>
            <Textarea
              value={data.nulage.bra}
              onChange={(e) => updateField('nulage', 'bra', e.target.value)}
            />
          </div>
          <div>
            <Label>Vad fungerar dåligt</Label>
            <Textarea
              value={data.nulage.daligt}
              onChange={(e) => updateField('nulage', 'daligt', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Spara Projektoutline</Button>
    </div>
  );
};
