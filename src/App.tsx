import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import NewExpenseForm from './Components/NewExpenseForm';
import ExpensesFilter from './Components/ExpensesFilter';
import ExpensesChart from './Components/ExpensesChart';

interface Expense {
  id: string;
  title: string;
  amount: number | string;
  date: string;
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




  const addNewExpense = (e: React.SubmitEvent<HTMLFormElement>) => {    
    e.preventDefault();

    //Creating a new object rather than directly updating the newExpense state to ensure that
    // React doesn't miss a data update
    const expenseData = {...newExpense , id:uuidv4()};

    setExpenseList(prev => [expenseData , ...prev]); //Add the 'newExpense' to the expenseList using the setter function
    setNewExpense(defaultExpense);    
  };


  const handleDelete = (id: string) => {
    //filter out the expense with given id from expenseList
    setExpenseList(prev => prev.filter(exp => exp.id !== id));
  }



  
  

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center p-8 space-y-6 text-white'>

      
      {/* App Container */}
      <div className='w-2xl space-y-6'>

        <div className='bg-indigo-600 p-4 rounded-2xl space-y-4'>
          <h3 className='text-xs text-indigo-200 font-bold'>ADD NEW EXPENSE</h3>
          <NewExpenseForm newExpense={newExpense} setNewExpense={setNewExpense} addNewExpense={addNewExpense} />
        </div>

      </div>

      {/* DISPLAY AREA */}
      <div className='w-2xl space-y-6 rounded-xl bg-gray-800 px-5 py-7'>
        <ExpensesFilter selectedYear={selectedYear}  setSelectedYear={setSelectedYear} />


        {/* CHARTING */}
        <ExpensesChart filteredExpenses={filteredExpenses}/>
        


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
