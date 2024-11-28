"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Bar, BarChart, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts";

interface ChartEntry {
    uf: string;
    total_expenses: number;
}

interface UfChartProps {
    year: number;
    data: { year: number; data: ChartEntry[] }[];
}

interface ChartData {
    className: string;
    radius: number;
    dataKey: string;
    name: string;
    value: number;
    payload: ChartEntry;
    hide: boolean;
}


export const UfChart = ({ data, year }: UfChartProps) => {

    // encontra os dados
    let chartData = data.find((item) => Number(item.year) === year)?.data;

    console.log('chartData', chartData)
    if (!chartData) return null

    //encontra os dados do ano
    if (!chartData.some((item) => item.uf === 'Brasil')) {

        const average = {
            uf: 'Brasil',
            total_expenses: chartData.reduce((acc, item) => acc + item.total_expenses, 0) / chartData.length
        };
        chartData.push(average);
    }
    // faz a ordenação por gastos
    chartData = chartData.sort((a, b) => b.total_expenses - a.total_expenses);


    const CustomTooltip = ({ active, payload, label }: {
        active: boolean;
        payload: ChartData[];
        label: string;
    }) => {

        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-white rounded p-2" >
                    <p className="label">
                        <span className="text-orange-500 fonte-bold">{label}: </span>
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
                <CardTitle className="text-2xl">Gastos por UF</CardTitle>
                <CardDescription>{`Dados de ${year}`}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={{}} className="min-h-[800px] w-full">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" >

                        <YAxis dataKey='uf' type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
                        <XAxis dataKey='total_expenses' type="number" tickMargin={10} tickFormatter={(value) => new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(value)} />
                        <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
                        <Bar dataKey="total_expenses" className="fill-orange-500" layout="horizontal" radius={4} background={{ fill: '#eee' }}>
                            {chartData.map((entry: ChartEntry, index: number) => {

                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        className={cn(
                                            'fill-current',
                                            entry.uf === 'Brasil' ? 'fill-orange-800' : 'fill-orange-500'
                                        )}
                                    />
                                );
                            })}
                            <LabelList dataKey="uf" position="insideLeft" className="fill-white font-bold" />
                            <LabelList dataKey="total_expenses" position="insideRight" fontSize={10} className="fill-white" formatter={(value: number) => new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(value)} />
                        </Bar>

                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card >

    )
}
