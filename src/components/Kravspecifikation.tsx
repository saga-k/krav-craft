import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

interface FunktionelltKrav {
  id: string;
  krav: string;
  beskrivning: string;
  moscow: string;
}

interface IckeFunktionelltKrav {
  id: string;
  kategori: string;
  beskrivning: string;
  prioritet: string;
}

export const Kravspecifikation = () => {
  const [funktionella, setFunktionella] = useState<FunktionelltKrav[]>([]);
  const [ickeFunktionella, setIckeFunktionella] = useState<IckeFunktionelltKrav[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.getKravspec();
      setFunktionella(result.funktionella);
      setIckeFunktionella(result.ickefunktionella);
    } catch (error) {
      console.error('Fel vid laddning:', error);
    }
  };

  const handleSave = async () => {
    try {
      await api.saveKravspec({ funktionella, ickeFunktionella });
      toast({ title: 'Sparat!', description: 'Kravspecifikation har sparats.' });
    } catch (error) {
      toast({ title: 'Fel', description: 'Kunde inte spara data.', variant: 'destructive' });
    }
  };

  const addFunktionellt = () => {
    const num = funktionella.length + 1;
    setFunktionella([...funktionella, {
      id: `FK-${String(num).padStart(3, '0')}`,
      krav: '',
      beskrivning: '',
      moscow: 'must'
    }]);
  };

  const removeFunktionellt = (id: string) => {
    setFunktionella(funktionella.filter(k => k.id !== id));
  };

  const updateFunktionellt = (id: string, field: keyof FunktionelltKrav, value: string) => {
    setFunktionella(funktionella.map(k => 
      k.id === id ? { ...k, [field]: value } : k
    ));
  };

  const addIckeFunktionellt = () => {
    const num = ickeFunktionella.length + 1;
    setIckeFunktionella([...ickeFunktionella, {
      id: `IFK-${String(num).padStart(3, '0')}`,
      kategori: 'prestanda',
      beskrivning: '',
      prioritet: 'must'
    }]);
  };

  const removeIckeFunktionellt = (id: string) => {
    setIckeFunktionella(ickeFunktionella.filter(k => k.id !== id));
  };

  const updateIckeFunktionellt = (id: string, field: keyof IckeFunktionelltKrav, value: string) => {
    setIckeFunktionella(ickeFunktionella.map(k => 
      k.id === id ? { ...k, [field]: value } : k
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Funktionella krav</CardTitle>
          <Button onClick={addFunktionellt} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Lägg till krav
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold w-24">ID</th>
                  <th className="text-left p-2 font-semibold">Krav</th>
                  <th className="text-left p-2 font-semibold">Beskrivning</th>
                  <th className="text-left p-2 font-semibold w-40">MoSCoW</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {funktionella.map((krav) => (
                  <tr key={krav.id} className="border-b">
                    <td className="p-2">
                      <Input value={krav.id} readOnly className="bg-muted" />
                    </td>
                    <td className="p-2">
                      <Input
                        value={krav.krav}
                        onChange={(e) => updateFunktionellt(krav.id, 'krav', e.target.value)}
                        placeholder="Boka klass"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={krav.beskrivning}
                        onChange={(e) => updateFunktionellt(krav.id, 'beskrivning', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        value={krav.moscow}
                        onValueChange={(value) => updateFunktionellt(krav.id, 'moscow', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="must">Must have</SelectItem>
                          <SelectItem value="should">Should have</SelectItem>
                          <SelectItem value="could">Could have</SelectItem>
                          <SelectItem value="wont">Won't have</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFunktionellt(krav.id)}
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Icke-funktionella krav</CardTitle>
          <Button onClick={addIckeFunktionellt} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Lägg till krav
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold w-24">ID</th>
                  <th className="text-left p-2 font-semibold w-40">Kategori</th>
                  <th className="text-left p-2 font-semibold">Beskrivning</th>
                  <th className="text-left p-2 font-semibold w-40">Prioritet</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {ickeFunktionella.map((krav) => (
                  <tr key={krav.id} className="border-b">
                    <td className="p-2">
                      <Input value={krav.id} readOnly className="bg-muted" />
                    </td>
                    <td className="p-2">
                      <Select
                        value={krav.kategori}
                        onValueChange={(value) => updateIckeFunktionellt(krav.id, 'kategori', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prestanda">Prestanda</SelectItem>
                          <SelectItem value="sakerhet">Säkerhet</SelectItem>
                          <SelectItem value="gdpr">GDPR</SelectItem>
                          <SelectItem value="anvandbarhet">Användbarhet</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Input
                        value={krav.beskrivning}
                        onChange={(e) => updateIckeFunktionellt(krav.id, 'beskrivning', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        value={krav.prioritet}
                        onValueChange={(value) => updateIckeFunktionellt(krav.id, 'prioritet', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="must">Must have</SelectItem>
                          <SelectItem value="should">Should have</SelectItem>
                          <SelectItem value="could">Could have</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIckeFunktionellt(krav.id)}
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

      <Button onClick={handleSave} className="w-full">Spara Kravspecifikation</Button>
    </div>
  );
};
