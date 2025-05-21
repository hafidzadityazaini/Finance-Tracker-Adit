import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";

const TransactionList = ({ transactions = [], onDelete }) => {
  const formatCurrency = (num) =>
    num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div
      className="max-w-3xl mx-auto rounded-2xl bg-[#f5f1e9] p-6 shadow-lg mb-6"
      aria-label="Riwayat transaksi"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900">
        Riwayat Transaksi
      </h2>
      {transactions.length === 0 ? (
        <p className="text-center text-amber-600">
          Belum ada transaksi yang ditambahkan.
        </p>
      ) : (
        <ul className="divide-y divide-amber-300">
          <AnimatePresence>
            {transactions.map((t) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-3 px-3 rounded hover:bg-amber-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  {t.type === "income" ? (
                    <ArrowDownCircle
                      className="text-amber-700"
                      size={24}
                      aria-label="Pemasukan"
                    />
                  ) : (
                    <ArrowUpCircle
                      className="text-amber-700"
                      size={24}
                      aria-label="Pengeluaran"
                    />
                  )}
                  <div>
                    <p className="font-medium text-amber-900">
                      {t.description}
                    </p>
                    <p className="text-sm text-amber-700 capitalize">
                      {t.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                  <span
                    className={`text-lg font-bold ${
                      t.type === "income" ? "text-amber-900" : "text-amber-800"
                    } tabular-nums`}
                    aria-label={`Jumlah ${t.type}`}
                  >
                    {formatCurrency(t.amount)}
                  </span>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="flex items-center gap-1 bg-amber-700 text-white text-sm py-1 px-3 rounded-xl hover:bg-amber-800 transition"
                    aria-label={`Hapus transaksi ${t.description}`}
                    title="Hapus transaksi"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
