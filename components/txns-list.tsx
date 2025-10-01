
"use client";

import {
  fetchAddressTransactions,
  type FetchAddressTransactionsResponse,
} from "../lib/fetch-address-transactions";
import { TransactionDetail } from "./txn-details";
import { useState } from "react";

interface TransactionsListProps {
  address: string;
  transactions: FetchAddressTransactionsResponse;
}

export function TransactionsList({
  address,
  transactions,
}: TransactionsListProps) {
  const [allTxns, setAllTxns] = useState(transactions);

  // Debug: Log the transactions data to see the structure
  console.log('TransactionsList received transactions:', transactions);
  console.log('First transaction:', transactions.results[0]);

  // Load another 20 txns
  async function loadMoreTxns() {
      
    // The new offset to fetch transaction is the offset we used
    // in the last request + the number of txns we fetched previously
    // e.g. if initially we fetched offset = 0 with limit = 20
    // the new offset would be 0 + 20 = 20 to fetch transactions
    // 20 to 40
    const newTxns = await fetchAddressTransactions({
      address,
      offset: allTxns.offset + allTxns.limit,
    });

    setAllTxns({
      ...newTxns,
      results: [...allTxns.results, ...newTxns.results],
    });
  }

  // Check if we have valid data
  if (!allTxns || !allTxns.results || allTxns.results.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-center text-gray-400">
          No transactions found for this address.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border rounded-md divide-y border-gray-800 divide-gray-800">
        {allTxns.results.map((tx: FetchAddressTransactionsResponse['results'][0], index: number) => {
          // Add safety checks for the transaction data
          if (!tx || !tx.tx_id) {
            console.warn('Invalid transaction data at index', index, tx);
            return null;
          }
          return (
            <div key={tx.tx_id}>
              <TransactionDetail result={tx} />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded-lg w-fit border border-gray-800 mx-auto text-center hover:bg-gray-900 transition-all"
        onClick={loadMoreTxns}
      >
        Load More
      </button>
    </div>
  );
}