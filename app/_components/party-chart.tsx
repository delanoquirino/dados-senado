"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Bar, BarChart, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts";

type UfChartProps = {
    year: number;
    data: {
        year: string,
        data: {
            party: string;
            senadtor_ids: string[],
            total_per_senator: number,
            total_expenses: number

        }[]

    }[]

}

interface ChartDataEntry {
    uf: string;
    total_per_senator: number; // Representa o valor das despesas
}

interface ChartData {
    className: string;
    radius: number;
    dataKey: string;
    name: string;
    value: number;
    payload: ChartDataEntry;
    hide: boolean;
}

export const PartyChart = ({ data, year }: UfChartProps) => {
    // encontra os dados

    const chartData = data.find((item) => Number(item.year) === year)?.data;

    if (!chartData) return null;

    let partChartData = chartData.map((item) => {
        return {
            party: item.party,
            total_per_senator: item.total_per_senator,
        };
    })


    // adiciona media
    if (!partChartData.some((item) => item.party === 'Brasil')) {

        const average = {
            party: 'Brasil',
            total_per_senator:
                partChartData.reduce((acc, item) => acc + item.total_per_senator, 0) /
                partChartData.length
        };

        partChartData.push(average);
    }

    // faz a ordenação por gastos
    partChartData = partChartData.sort((a, b) => b.total_per_senator - a.total_per_senator);


    const CustomTooltip = ({ active, payload, label }: {
        active: boolean;
        payload: ChartData[];
        label: string;
    }) => {

        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-white rounded p-2" >
                    <p className="label">
                        <span className="text-blue-500 fonte-bold">{label}: </span>
                        <span> {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(payload[0].value)}</span>

                    </p>
                </div>
            );
        }

        return null;
    };



    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-2xl">Gastos por Partido</CardTitle>
                <CardDescription>{`Dados de ${year}`}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={{}} className="min-h-[800px] w-full">
                    <BarChart accessibilityLayer data={partChartData} layout="vertical" margin={{ right: 50 }} >

                        <YAxis dataKey='party' type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
                        <XAxis dataKey='total_per_senator' type="number" tickMargin={10} tickFormatter={(value) => new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(value)} />
                        <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="total_per_senator" className="fill-blue-500" layout="horizontal" radius={4} background={{ fill: '#eee' }} activeBar={false} >

                            <LabelList dataKey="party" position="insideLeft" className="fill-white font-bold" />
                            <LabelList dataKey="total_per_senator" position="right" fontSize={10} className="fill-slate-600" formatter={(value: number) => new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(value)} />
                            {partChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} className={cn('fill-current', entry.party === 'Brasil' ? 'fill-blue-800' : 'fill-blue-500')} />
                            ))}
                        </Bar>

                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card >

    )
}
