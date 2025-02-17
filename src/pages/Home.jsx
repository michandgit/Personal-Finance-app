import React from 'react'
import Arrows from "../assets/arrows.jpg"
import "./Home.css"

const Home = () => {
  return (
    <div className='container'>
      <div className="info">
        <h2>Personal Finance App</h2>
      Take control of your financial future with our Personal Finance Dashboard! Track your income, expenses, savings, and investments in one convenient place. Visualize your spending habits, set budgets, and monitor progress towards your financial goals. With real-time insights and easy-to-understand charts, you can make informed decisions and stay on top of your finances effortlessly. Start managing your money smarter today!
      </div>
      <div className="img">
        <img src={Arrows} alt="" />
      </div>
      
    </div>
  )
}

export default Home
