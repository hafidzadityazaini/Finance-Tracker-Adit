import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ChartPie, PlusCircle, ListChecks } from "lucide-react";
import { motion } from "framer-motion";

import FinanceSummary from "./components/finance-sum";
import TransactionForm from "./components/transactionform";
import TransactionList from "./components/translist";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  // Navbar button list data
  const navItems = [
    { to: "/", label: "Ringkasan", Icon: ChartPie },
    { to: "/form", label: "Tambah Transaksi", Icon: PlusCircle },
    { to: "/list", label: "Daftar Transaksi", Icon: ListChecks },
  ];

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-amber-900 select-none">
        📊 Personal Finance Tracker
      </h1>

      <nav className="flex justify-center gap-6 mb-12">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"} // supaya active class hanya root pas di /
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-lg min-w-[160px] transition-colors
               ${
                 isActive
                   ? "bg-amber-700 text-white shadow-lg"
                   : "text-amber-900 hover:bg-amber-300 hover:text-amber-900"
               }`
            }
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={22} />
            </motion.div>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route
          path="/"
          element={<FinanceSummary transactions={transactions} />}
        />
        <Route
          path="/form"
          element={<TransactionForm onAddTransaction={addTransaction} />}
        />
        <Route
          path="/list"
          element={
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          }
        />
      </Routes>
    </div>
  );
}