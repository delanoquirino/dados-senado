
import { Header } from "@/app/_components/header";
import { UfChart } from "@/app/_components/uf-chart";
import { PartyChart } from "./_components/party-chart";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: HomeProps) {

  const expensesType = searchParams.type || 'uf';
  const year = Number(searchParams.year) || 2024;
  if (expensesType !== 'uf' && expensesType !== 'party') {
    return null
  }

  const ufRes = await fetch(`https://apis.codante.io/senator-expenses/summary/by-uf`);

  const partyRes = await fetch(`https://apis.codante.io/senator-expenses/summary/by-party`);

  const ufData = await ufRes.json();
  const partyData = await partyRes.json();
  console.log('year', year)
  return (
    <main className=" container mx-auto py-16">
      <Header year={year} expensesType={expensesType} />
      {expensesType === 'uf' && <UfChart data={ufData} year={year} />}
      {expensesType === 'party' && <PartyChart data={partyData} year={year} />}
    </main>
  );
}
