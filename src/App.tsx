import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

interface Expense {
  id: string;
  title: string;
  amount: number | string;
  date: string;
}

interface Options {
  value: number;
  label: number
}

const defaultExpense = {
  id: uuidv4(),
  title: '',
  amount: '',
  date: ''
}


function App() {

  const [newExpense , setNewExpense] = useState<Expense>(defaultExpense);
  const [expenseList , setExpenseList] = useState<Expense[]>([]);
  const [selectedYear , setSelectedYear] = useState<string>("2026");

  const yearOptions: Options[] = [
    { value: 2023 , label: 2023 },
    { value: 2024 , label: 2024 },
    { value: 2025 , label: 2025 },
    { value: 2026 , label: 2026 }
  ]

  const addNewExpense = (e: React.SubmitEvent<HTMLFormElement>) => {    
    e.preventDefault();
    console.log("expenseList updated with new item");
    console.log("Date = " , newExpense.date);
    newExpense.id = uuidv4();
    setExpenseList(prev => [newExpense , ...prev]); //Add the 'newExpense' to the expenseList using the setter function
    setNewExpense(defaultExpense);    
  };



  
  

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center p-8 space-y-6 text-white'>

      
      {/* App Container */}
      <div className='w-2xl space-y-6'>

        <div className='bg-indigo-600 p-4 rounded-2xl space-y-4'>
          <h3 className='text-xs text-indigo-200 font-bold'>ADD NEW EXPENSE</h3>
          <form className='space-y-4' onSubmit={addNewExpense}>
            
            <div className='flex justify-between space-3'>
              <div className='space-y-1'>
                <label className='block'>Title</label>
                <input value={newExpense.title} onChange={e => setNewExpense(prev => ({...prev, title: e.target.value}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="text" placeholder='e.g. Toilet Paper'/>
              </div>

              <div className='space-y-1'>
                <label className='block'>Amount</label>
                <input value={newExpense.amount} onChange={e => setNewExpense(prev => ({...prev, amount: Number(e.target.value)}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="text" placeholder='0.00'/>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='space-y-1'>
                <label className='block'>Date</label>
                <input value={newExpense.date} onChange={e => setNewExpense(prev => ({...prev, date: (e.target.value)}))} className='block h-10 bg-white rounded-xl p-1 text-black' type="date" placeholder='dd-mm-yy'/>
              </div>
              <button type='submit' disabled={newExpense.date==='' || newExpense.title==='' || newExpense.amount===''} className='bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl px-6 font-bold disabled:bg-gray-600 disabled:text-gray-400'>Add expense</button>
            </div>
            
          </form>
        </div>

      </div>

      {/* DISPLAY AREA */}
      <div className='w-2xl space-y-6 rounded-xl bg-gray-800 px-5 py-7'>
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

        {/* charting */}
        

        {/* List of all expenses for selectedYear */}
        <ul className='space-y-4'> 
          {expenseList.filter(f => f.date.slice(0,4) === selectedYear).length === 0 ? (
            <li className='text-gray-500 text-center italic'>No expenses found for {selectedYear}</li>
          ) : (            
            expenseList.filter(f => f.date.slice(0,4) === selectedYear).map(item => {
              const dateObj = new Date(item.date);
              const month = dateObj.toLocaleString('en-US', { month: 'short' });
              const day = dateObj.toLocaleString('en-US', { day: '2-digit' });
              const year = dateObj.getFullYear();

              return(
                <li key={item.id} className='flex justify-center items-center font-bold text-white w-full bg-gray-600 rounded-xl flex justify-between p-3 space-x-3'>
                  <div className='rounded-xl p-2 h-20 w-20 bg-gray-900 text-white font-bold flex flex-col items-center'>
                    <span className='text-sm text-indigo-400'>{month}</span>
                    <span className='text-xl font-black'>{day}</span>
                    <span className='text-sm'>{year}</span>
                  </div>
                  <h2 className='flex-1 text-lg'>{item.title}</h2>            
                  <span className='font-bold rounded-xl py-2 px-4 bg-indigo-700 border border-indigo-500'>${item.amount}</span>
                </li>
              );
            })            
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App
