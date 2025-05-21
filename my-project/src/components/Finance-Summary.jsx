financesum.jsx

import React from "react";

const FinanceSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter(tx => tx.type === "pemasukan")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === "pengeluaran")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatRupiah = (amount) =>
    amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4">Ringkasan Keuangan</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-green-600 text-sm">Pemasukan</p>
          <p className="text-lg font-bold">{formatRupiah(totalIncome)}</p>
        </div>
        <div>
          <p className="text-red-600 text-sm">Pengeluaran</p>
          <p className="text-lg font-bold">{formatRupiah(totalExpense)}</p>
        </div>
        <div>
          <p className="text-blue-600 text-sm">Saldo Akhir</p>
          <p className="text-lg font-bold">{formatRupiah(balance)}</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceSummary;
