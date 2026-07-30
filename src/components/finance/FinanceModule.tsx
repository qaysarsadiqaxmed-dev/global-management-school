import React, { useState } from 'react';
import { DollarSign, FileText, CheckCircle2, CreditCard, Printer, Plus, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { FeeInvoice, PaymentReceipt } from '../../types';

export const FinanceModule: React.FC = () => {
  const { invoices, receipts, recordPayment, createInvoice, students, t } = useSchool();
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<PaymentReceipt | null>(null);

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<PaymentReceipt['paymentMethod']>('Mobile Money (EVC/Zaad)');
  const [refNo, setRefNo] = useState<string>('EVC-99441122');

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || paymentAmount <= 0) return;

    recordPayment(selectedInvoice.id, paymentAmount, paymentMethod, refNo);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600" /> Fees, Invoices & Payment Gateway
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage tuition fee structures, track outstanding balances, process mobile money payments (EVC/Zaad), and issue official receipts.
          </p>
        </div>
      </div>

      {/* Invoice Directory */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
          <span>Student Fee Invoices</span>
          <span className="text-xs text-slate-400 font-normal">Term 2 Billing Cycle</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                <th className="p-3">Invoice No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Total Fee</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {invoices.map(inv => {
                const balance = inv.totalAmount - inv.paidAmount - inv.discountAmount;

                return (
                  <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono font-bold text-indigo-600">{inv.invoiceNo}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{inv.studentName}</td>
                    <td className="p-3 font-medium">${inv.totalAmount}</td>
                    <td className="p-3 text-emerald-600 font-bold">${inv.paidAmount}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">${balance}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        inv.status === 'Partially Paid' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {balance > 0 ? (
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setPaymentAmount(balance);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                        >
                          <CreditCard className="w-3.5 h-3.5 inline mr-1" /> Pay Fee
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipts History */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" /> Recent Payment Receipts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {receipts.map(rec => (
            <div key={rec.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">{rec.receiptNo}</span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">${rec.amount} Paid</h4>
                <p className="text-[11px] text-slate-500">{rec.paymentMethod} • Ref: {rec.referenceNo}</p>
              </div>
              <button
                onClick={() => setActiveReceipt(rec)}
                className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 hover:bg-blue-100"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Processing Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <form onSubmit={handleProcessPayment} className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Process Fee Payment</h3>
                <p className="text-xs text-slate-500 font-mono">Invoice #{selectedInvoice.invoiceNo}</p>
              </div>
              <button type="button" onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Payment Amount ($)</label>
                <input
                  required
                  type="number"
                  min={1}
                  max={selectedInvoice.totalAmount - selectedInvoice.paidAmount}
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-sm text-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Payment Channel</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-semibold"
                >
                  <option value="Mobile Money (EVC/Zaad)">Mobile Money (EVC Plus / Zaad / Premier Wallet)</option>
                  <option value="Cash">Cash at Cashier Desk</option>
                  <option value="Bank Transfer">Direct Bank Transfer</option>
                  <option value="Credit Card">Credit / Debit Card</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Reference / TxID Number</label>
                <input
                  type="text"
                  value={refNo}
                  onChange={e => setRefNo(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button type="button" onClick={() => setSelectedInvoice(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
                Confirm & Generate Receipt
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="text-center border-b border-slate-200 pb-3">
              <h3 className="font-black text-lg uppercase tracking-tight text-indigo-900">Global Management School</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Official Payment Receipt</p>
              <span className="text-xs font-mono font-bold text-blue-600">{activeReceipt.receiptNo}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Date:</span> <strong>{activeReceipt.paymentDate}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Amount Paid:</span> <strong className="text-emerald-700 text-base font-black">${activeReceipt.amount}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Method:</span> <strong>{activeReceipt.paymentMethod}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Tx Reference:</span> <strong className="font-mono">{activeReceipt.referenceNo}</strong></div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <button onClick={() => setActiveReceipt(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
