import React from 'react'

interface Options {
  value: number;
  label: number
}

interface expensesFilterProps {
    selectedYear: string;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>    
}

function ExpensesFilter({selectedYear , setSelectedYear } : expensesFilterProps) {

    const yearOptions: Options[] = [
        { value: 2023 , label: 2023 },
        { value: 2024 , label: 2024 },
        { value: 2025 , label: 2025 },
        { value: 2026 , label: 2026 }
    ]


    return (
        <div className='flex justify-between'>
            <h2 className='font-bold  text-white'>Filter by Year</h2>
            <select id="select-year" value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className='rounded-lg px-3 py-2 bg-gray-900'>
                {yearOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
        </div>
    )
}

export default ExpensesFilter