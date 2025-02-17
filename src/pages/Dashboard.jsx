import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";  // For the Pie Chart
import { Card, CardContent, Typography } from "@mui/material";  
import "./Dashboard.css";  



export default function Dashboard() {
  
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]); 
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome ,setTotalIncome ] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  
 


  useEffect(() => {
    axios.get("http://localhost:5000/transactions").then((res) => {
    
      console.log(res);
      const grouped = res.data.reduce((acc, transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + transaction.amount;
        return acc;
      }, {});

    
      const totalExpenses = res.data.reduce((sum, transaction) => {
        if (transaction.type === "expense") {
          return sum + transaction.amount;  
        }
        return sum; 
      }, 0);
      setTotalExpenses(totalExpenses);

      const totalIncomes = res.data.reduce((sum, transaction) => {
        if (transaction.type === "income"){
          return sum + transaction.amount;  
        }
        return sum;
      }, 0);
      setTotalIncome(totalIncomes);

     
      const categoryGrouped = res.data.reduce((acc, transaction) => {
        const category = transaction.type === "income" ? "income" : "expense";
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
      }, {});

     
      setCategoryData(Object.entries(categoryGrouped).map(([category, total]) => ({ category, total })));

    
      setData(Object.entries(grouped).map(([month, total]) => ({ month, total })));

      
      const recent = res.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      setRecentTransactions(recent);
    });
  }, []);



  
  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="dashboard-container">
    
      <h1 className="dashboard-header">Dashboard</h1>

      {/* Dashboard Summary Cards */}
      <div className="summary-cards">
      <Card className="card">
          <CardContent>
            <Typography variant="h5" className="card-title">Total Income</Typography>
            <Typography variant="h6" className="card-value">${totalIncome.toFixed(2)}</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent>
            <Typography variant="h5" className="card-title">Total Expenses</Typography>
            <Typography variant="h6" className="card-value">${totalExpenses.toFixed(2)}</Typography>
          </CardContent>
        </Card>


        <Card className="card">
          <CardContent>
            <Typography variant="h5" className="card-title">Recent Transactions</Typography>
            <ul>
              {recentTransactions.map((transaction, index) => (
                <li key={index}>
                  <strong>{transaction.description}</strong> - ${transaction.amount.toFixed(2)} on {new Date(transaction.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Budgeting Section: Set Monthly Category Budgets */}
     

     
      <div className="pie-chart-container">
        <h2>Category Breakdown</h2>
        <PieChart width={400} height={300}>
          <Pie 
            data={categoryData} 
            dataKey="total" 
            nameKey="category" 
            outerRadius={120} 
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart - Monthly Expenses */}
      <div className="bar-chart-container">
        <h2>Monthly Expenses</h2>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>

    </div>
  );
}
