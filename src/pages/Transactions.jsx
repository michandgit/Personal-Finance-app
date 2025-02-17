import { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css"; 


export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    date: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetchTransactions();
  }, []);

  

  const fetchTransactions = async () => {
    const res = await axios.get("https://personal-finance-app-api.vercel.app/transactions");
    setTransactions(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
   
      await axios.put(`https://personal-finance-app-api.vercel.app/transactions/${editingId}`, formData);
    } else {
    
      await axios.post("https://personal-finance-app-api.vercel.app/transactions", formData);
    }

    setFormData({ type: "income", amount: "", date: "", description: "" });
    setEditingId(null);
    fetchTransactions(); 
  };

  // Handle Edit click
  const handleEdit = (transaction) => {
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date.split("T")[0], 
      description: transaction.description,
    });
    setEditingId(transaction._id);
  };

  // Handle Delete transaction
  const handleDelete = async (id) => {
    await axios.delete(`https://personal-finance-app-api.vercel.app/transactions/${id}`);
    fetchTransactions(); 
  };

  return (
    <div className="transactions-container">
     
      <h1 className="transactions-title">Transactions</h1>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="form-control">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter description"
          />
        </div>

        <button type="submit" className="btn">{editingId ? "Update" : "Add"} Transaction</button>
      </form>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className={tx.type === "income" ? "income-row" : "expense-row"}>
              <td>{tx.type}</td>
              <td>${tx.amount}</td>
              <td>{tx.date.split("T")[0]}</td>
              <td>{tx.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(tx)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(tx._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
