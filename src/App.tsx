import { useEffect, useState } from 'react'
import './App.css'

interface Expense {
  id: number;
  title: string;
  amount: number;
  year: number;
  date: number;
}

interface Options {
  value: number;
  label: number
}

const defaultExpense = {
  id: Math.random()*1000,
  title: 'Untitled',
  amount: 0.00,
  year: 2026,
  date: Date.now()
}


function App() {

  const [newExpense , setNewExpense] = useState<Expense>(defaultExpense);
  const [expenseList , setExpenseList] = useState<Expense[]>([]);
  const [selectedYear , setSelectedYear] = useState<number>(2026);

  const yearOptions: Options[] = [
    { value: 2023 , label: 2023 },
    { value: 2024 , label: 2024 },
    { value: 2025 , label: 2025 },
    { value: 2026 , label: 2026 }
  ]

  const addNewExpense = (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    console.log("expenseList updated with new item");
    //Add the 'newExpense' to the expenseList using the setter function
    setExpenseList(prev => [newExpense , ...prev]);
    
  };

  useEffect(() => {
    addNewExpense;
  } ,[newExpense])

  let filteredExpenses:Expense[] = [];
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSelectedYear(Number(e.target.value));
    filteredExpenses = expenseList.filter(f => f.year === selectedYear);
  }

  

  return (
    <div className='min-h-screen bg-gray-900 flex-cols justify-center p-8 space-y-6 text-white'>

      
      {/* App Container */}
      <div className='w-xl space-y-6'>

        <div className='bg-indigo-600 p-4 rounded-2xl space-y-4'>
          <h3 className='text-xs text-indigo-200 font-bold'>ADD NEW EXPENSE</h3>
          <form className='space-y-4' onSubmit={addNewExpense}>
            
            <div className='flex justify-between space-3'>
              <div className='space-y-1'>
                <label className='block'>Title</label>
                <input onChange={e => setNewExpense(prev => ({...prev, title: e.target.value}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="text" placeholder='e.g. Toilet Paper'/>
              </div>

              <div className='space-y-1'>
                <label className='block'>Amount</label>
                <input onChange={e => setNewExpense(prev => ({...prev, amount: Number(e.target.value)}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="text" placeholder='0.00'/>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='space-y-1'>
                <label className='block'>Date</label>
                <input onChange={e => setNewExpense(prev => ({...prev, date: Number(e.target.value)}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="text" placeholder='dd-mm-yy'/>
              </div>
              <button type='submit' className='bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl px-8 py-3 font-bold'>Add expense</button>
            </div>
            
          </form>
        </div>

      </div>

      {/* DISPLAY AREA */}
      <div className='w-xl space-y-6'>
        <div className='flex justify-between'>
          <h2 className='font-bold  text-white'>Filter by Year</h2>
          <select id="select-year" value={selectedYear} onChange={handleYearChange}>
            {yearOptions.map(opt => (
              <option key={opt.value} value={opt.value} className='text-black'>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* charting */}
        

        {/* List of all expenses for selectedYear */}   
        {filteredExpenses.length === 0 ? (
          <p className='text-gray-500 text-center italic'>No expenses found for {selectedYear}</p>
        ) : (
          filteredExpenses.map(item => (
          <div key={item.id} className='text-bold text-white w-xl bg-gray-400 rounded-xl flex justify-between p-3'>
            <h2>{item.title}</h2>
            <span className=''>{item.amount}</span>
          </div>
        ))
        ) }

      </div>
      
    </div>
  )
}

export default App
