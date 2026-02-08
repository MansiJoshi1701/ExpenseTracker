import React from 'react'

interface Expense {
  id: string;
  title: string;
  amount: number | string;
  date: string;
}

interface newExpenseFormProps {
    newExpense: Expense;
    setNewExpense: React.Dispatch<React.SetStateAction<Expense>>;
    addNewExpense: (e: React.SubmitEvent<HTMLFormElement>) => void; 
}

function NewExpenseForm({ newExpense , setNewExpense , addNewExpense } : newExpenseFormProps) {
  return (
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
            <button type='submit' disabled={newExpense.date==='' || newExpense.title==='' || Number(newExpense.amount) <= 0} className='bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl px-6 font-bold disabled:bg-gray-600 disabled:text-gray-400'>Add expense</button>
        </div>
            
    </form>
 )
}

export default NewExpenseForm