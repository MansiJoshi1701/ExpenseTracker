

interface Expense {
  id: string;
  title: string;
  amount: number | string;
  date: string;
}

interface expensesChartProps {
    filteredExpenses: Expense[]
}

function ExpensesChart({filteredExpenses}: expensesChartProps) {

    
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


    return (
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
    )
}

export default ExpensesChart