'use client'
import logo from '../_assets/logo.svg'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from "../../components/ui/button"
import CalendarIcon from './icons/calendar-icon'
import FlagIcon from './icons/flag-icon'
import MapIcon from './icons/map-icon'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export const Header = ({ year, expensesType }: { year: number, expensesType: 'uf' | 'party' }) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();

    //para não ficar toda hora fazendo a chamada useCallback
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
    }, [searchParams])


    return (
        <header className="mb-12 flex flex-col gap-10 justify-center items-center lg:flex-row lg:justify-between">
            <div className="flex items-center gap-4 flex-col sm:flex-row p-2">
                <Image src={logo} alt='Bandeira do Brasil' width={70} height={70} />
                <div className="flex flex-col">
                    <h1 className='text-3xl font-bold mb-1'>Gastos dos Senadores Brasileiros</h1>
                    <p>Gastos dos senadores brasileiros total por <strong>
                        {expensesType === 'uf' ? 'estado' : 'partido'}</strong> - CEAPS</p>
                </div>

            </div>
            <nav className='flex gap-6 flex-col sm:flex-row'>
                <div className='border-b-2 pb-6 sm:border-r-2 sm:pr-6 sm:border-b-0 sm:pb-0 border-black/10 w-full'>
                    <DropdownMenu >

                        <DropdownMenuTrigger className=' w-full'>
                            <Button className='flex flex-col items-center justify-center text-xs gap-0 border-black/10 border-2   w-full rounded-lg '>
                                <CalendarIcon className='w-24 h-24' />
                                Calendario
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Escolha o ano</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={year.toString()} onValueChange={(year) => router.push(`${pathname}?${createQueryString('year', year.toString())}`)}>
                                <DropdownMenuRadioItem className='cursor-pointer' value="2024">2024</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="2023">2023</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="2022">2022</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="2021">2021</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="2020">2020</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex gap-4 flex-col sm:flex-row'>
                    <NavButton expenseType='uf' onClick={() => router.push(`${pathname}?${createQueryString('type', 'uf')} `)} >
                        <MapIcon className='w-24 h-24' />
                        Gastos por UF
                    </NavButton>
                    <NavButton expenseType='party' onClick={() => router.push(`${pathname}?${createQueryString('type', 'party')} `)}>
                        <FlagIcon className='w-24 h-24' />
                        Gastos por Partido
                    </NavButton>
                </div>

            </nav>
        </header>
    )
}

type NavButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    expenseType: 'uf' | 'party'
}

function NavButton({ expenseType, children, ...props }: NavButtonProps) {
    const searchParams = useSearchParams()
    const selectedExpenseType = searchParams.get('type') || 'uf'
    return (
        <Button className={`flex flex-col items-center justify-center text-xs gap-0 border-black/10 border-2 px-4 py-3 rounded-lg ${selectedExpenseType === expenseType
            ? expenseType === 'uf'
                ? 'border-orange-500 fill-orange-500'
                : expenseType === 'party'
                    ? 'border-blue-500 fill-blue-500'
                    : ''
            : 'border-black/10 fill-slate-500'}  ${expenseType === 'uf'
                ? ' hover:border-orange-500 hover:fill-orange-500 '
                : ' hover:border-blue-500 hover:fill-blue-500'
            } fill-slate-500 transition-colors`} {...props}>
            {children}
        </Button>
    )
}