import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjektOutline } from '@/components/ProjektOutline';
import { ProjektDirektiv } from '@/components/ProjektDirektiv';
import { Intressentanalys } from '@/components/Intressentanalys';
import { Personas } from '@/components/Personas';
import { Kravspecifikation } from '@/components/Kravspecifikation';
import { Riskanalys } from '@/components/Riskanalys';
import { TidsResursEstimat } from '@/components/TidsResursEstimat';
import { Genomforandestrategi } from '@/components/Genomforandestrategi';
import { EkonomiskOversikt } from '@/components/EkonomiskOversikt';
import { KvalitetOppfoljning } from '@/components/KvalitetOppfoljning';
import { RekommendationNastaSteg } from '@/components/RekommendationNastaSteg';
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
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-8 h-auto">
            <TabsTrigger value="outline" className="text-sm">Projektoutline</TabsTrigger>
            <TabsTrigger value="direktiv" className="text-sm">Projektdirektiv</TabsTrigger>
            <TabsTrigger value="intressenter" className="text-sm">Intressenter</TabsTrigger>
            <TabsTrigger value="personas" className="text-sm">Personas</TabsTrigger>
            <TabsTrigger value="kravspec" className="text-sm">Kravspec</TabsTrigger>
            <TabsTrigger value="risk" className="text-sm">Riskanalys</TabsTrigger>
            <TabsTrigger value="tidsresurs" className="text-sm">Tids/Resurs</TabsTrigger>
            <TabsTrigger value="genomforande" className="text-sm">Genomförande</TabsTrigger>
            <TabsTrigger value="ekonomi" className="text-sm">Ekonomi</TabsTrigger>
            <TabsTrigger value="kvalitet" className="text-sm">Kvalitet</TabsTrigger>
            <TabsTrigger value="rekommendation" className="text-sm">Rekommendation</TabsTrigger>
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

          <TabsContent value="tidsresurs">
            <TidsResursEstimat />
          </TabsContent>

          <TabsContent value="genomforande">
            <Genomforandestrategi />
          </TabsContent>

          <TabsContent value="ekonomi">
            <EkonomiskOversikt />
          </TabsContent>

          <TabsContent value="kvalitet">
            <KvalitetOppfoljning />
          </TabsContent>

          <TabsContent value="rekommendation">
            <RekommendationNastaSteg />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
