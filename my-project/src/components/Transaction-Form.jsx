import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(""); // "income" atau "expense"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Deskripsi tidak boleh kosong";
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = "Jumlah harus lebih dari 0";
    if (type !== "income" && type !== "expense")
      newErrors.type = "Pilih tipe transaksi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Kirim data transaksi baru ke parent
    onAddTransaction({
      id: Date.now(),
      description: description.trim(),
      amount: Number(amount),
      type,
    });

    // Reset form
    setDescription("");
    setAmount("");
    setType("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Tambah Transaksi Baru</h2>

      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Deskripsi
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contoh: Makan Siang"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block font-medium mb-1">
          Jumlah (Rp)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contoh: 50000"
        />
        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
      </div>

      <div className="mb-6">
        <span className="block font-medium mb-1">Jenis Transaksi</span>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
            className="form-radio"
          />
          <span className="ml-2">Pemasukan</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
            className="form-radio"
          />
          <span className="ml-2">Pengeluaran</span>
        </label>
        {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring"
      >
        <PlusCircle className="w-5 h-5" />
        Tambah Transaksi
      </motion.button>
    </form>
  );
}