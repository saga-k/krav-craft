import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjektOutline } from '@/components/ProjektOutline';
import { ProjektDirektiv } from '@/components/ProjektDirektiv';
import { Intressentanalys } from '@/components/Intressentanalys';
import { Personas } from '@/components/Personas';
import { Kravspecifikation } from '@/components/Kravspecifikation';
import { Riskanalys } from '@/components/Riskanalys';
import { FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Kravarbete Mallar</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="outline" className="w-full">
          <TabsList className="grid grid-cols-6 w-full mb-8">
            <TabsTrigger value="outline">Projektoutline</TabsTrigger>
            <TabsTrigger value="direktiv">Projektdirektiv</TabsTrigger>
            <TabsTrigger value="intressenter">Intressenter</TabsTrigger>
            <TabsTrigger value="personas">Personas</TabsTrigger>
            <TabsTrigger value="kravspec">Kravspec</TabsTrigger>
            <TabsTrigger value="risk">Riskanalys</TabsTrigger>
          </TabsList>

          <TabsContent value="outline">
            <ProjektOutline />
          </TabsContent>

          <TabsContent value="direktiv">
            <ProjektDirektiv />
          </TabsContent>

          <TabsContent value="intressenter">
            <Intressentanalys />
          </TabsContent>

          <TabsContent value="personas">
            <Personas />
          </TabsContent>

          <TabsContent value="kravspec">
            <Kravspecifikation />
          </TabsContent>

          <TabsContent value="risk">
            <Riskanalys />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
