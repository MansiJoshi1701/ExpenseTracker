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
  

  // 1. Get the filtered list (This is your source of truth)
  let filteredExpenses = expenseList.filter(exp => exp.date.slice(0, 4) === selectedYear);

  // 2. Prepare the 12 data points
  const chartDataPoints = [
  {label: 'Jan' , value: 0},
  {label: 'Feb' , value: 0},
  {label: 'Mar' , value: 0},
  {label: 'Apr' , value: 0},
  {label: 'May' , value: 0},
  {label: 'Jun' , value: 0},
  {label: 'Jul' , value: 0},
  {label: 'Aug' , value: 0},
  {label: 'Sep' , value: 0},
  {label: 'Oct' , value: 0},
  {label: 'Nov' , value: 0},
  {label: 'Dec' , value: 0}        
]
  
  // 3. Fill the points using the fresh filteredExpenses
  for (const exp of filteredExpenses) {
    const month = new Date(exp.date).getMonth();
    chartDataPoints[month].value += Number(exp.amount); // Use += to sum them up!
  }

  // 4. Calculate the max on the fly
  const maxAmount = Math.max(...chartDataPoints.map(dp => dp.value));



  const yearOptions: Options[] = [
    { value: 2023 , label: 2023 },
    { value: 2024 , label: 2024 },
    { value: 2025 , label: 2025 },
    { value: 2026 , label: 2026 }
  ]

  const addNewExpense = (e: React.SubmitEvent<HTMLFormElement>) => {    
    e.preventDefault();
    newExpense.id = uuidv4();
    setExpenseList(prev => [newExpense , ...prev]); //Add the 'newExpense' to the expenseList using the setter function
    setNewExpense(defaultExpense);    
  };


  const handleDelete = (id: string) => {
    //filter out the expense with given id from expenseList
    filteredExpenses = (filteredExpenses.filter(f => f.id !== id));
  }



  
  

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


        {/* CHARTING */}
        <div className="bg-indigo-200 p-4 rounded-xl flex justify-around items-end h-40">
          {chartDataPoints.map((dataPoint) => {
            let barHeight = '0%';

            if (maxAmount > 0) {
              barHeight = Math.round((dataPoint.value / maxAmount) * 100) + '%';
            }

            return (
              <div key={dataPoint.label} className="h-full flex flex-col items-center flex-1">
                {/* The Bar Container */}
                <div className="w-3 h-full bg-indigo-100 border border-indigo-900 rounded-full flex flex-col justify-end overflow-hidden">
                  {/* The Actual Fill */}
                  <div 
                    className="bg-indigo-600 transition-all duration-500 ease-out" 
                    style={{ height: barHeight }}
                  ></div>
                </div>
                {/* The Label */}
                <p className="text-[10px] font-bold text-indigo-900 mt-2">{dataPoint.label}</p>
              </div>
            );
          })}
        </div>
        


        {/* List of all expenses for selectedYear */}
        <ul className='space-y-4'> 
          {filteredExpenses.length === 0 ? (
            <li className='text-gray-500 text-center italic'>No expenses found for {selectedYear}</li>
          ) : (            
            filteredExpenses.map(item => {
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
                  <button onClick={() => handleDelete(item.id)} className='font-lg rounded-xl py-2 px-4 bg-gray-700 border border-gray-500 hover:bg-gray-800'>Delete</button>
                  
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
