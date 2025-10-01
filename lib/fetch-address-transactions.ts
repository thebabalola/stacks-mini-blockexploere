// Input to our function
interface FetchAddressTransactionsArgs {
	address: string;
	offset?: number;
  }
  
  // Output from our function
  export interface FetchAddressTransactionsResponse {
	limit: number;
	offset: number;
	total: number;
	results: Transaction[];
  }

  // More flexible type for actual API response
  export interface ApiTransactionResponse {
	limit: number;
	offset: number;
	total: number;
	results: Transaction[]; // Use proper Transaction type
  }
  
  // Intermediary types of transactions we get from Hiro's APIs
  interface BaseTransaction {
	tx_id: string;
	nonce: number;
	sender_address: string;
	block_hash: string;
	parent_block_hash: string;
	block_height: number;
	block_time: number;
	tx_status: string;
	fee_rate: string;
	sponsored: boolean;
	tx_type:
	  | "coinbase"
	  | "token_transfer"
	  | "smart_contract"
	  | "contract_call"
	  | "poison_microblock";
  }
  
  interface CoinbaseTransaction extends BaseTransaction {
	tx_type: "coinbase";
  }
  
  interface TokenTransferTransaction extends BaseTransaction {
	tx_type: "token_transfer";
	token_transfer: {
	  recipient_address: string;
	  amount: string;
	};
  }
  
  interface SmartContractTransaction extends BaseTransaction {
	tx_type: "smart_contract";
	smart_contract: {
	  clarity_version: number;
	  contract_id: string;
	};
  }
  
  interface ContractCallTransaction extends BaseTransaction {
	tx_type: "contract_call";
	contract_call: {
	  contract_id: string;
	  function_name: string;
	};
  }
  
  interface PoisonMicroblockTransaction extends BaseTransaction {
	tx_type: "poison_microblock";
  }
  
  export type Transaction =
	| CoinbaseTransaction
	| TokenTransferTransaction
	| SmartContractTransaction
	| ContractCallTransaction
	| PoisonMicroblockTransaction;
  

  // Function to fetch address transactions
  export async function fetchAddressTransactions(
	args: FetchAddressTransactionsArgs
  ): Promise<FetchAddressTransactionsResponse> {
	const { address, offset = 0 } = args;
	
	try {
	  const response = await fetch(
		`https://api.hiro.so/extended/v1/address/${address}/transactions?limit=50&offset=${offset}`
	  );
	  
	  if (!response.ok) {
		throw new Error(`Failed to fetch transactions: ${response.statusText}`);
	  }
	  
	  const data = await response.json();
	  console.log('Raw API response:', data);
	  console.log('First result:', data.results?.[0]);
	  
	  // Ensure we have the expected structure
	  if (!data.results || !Array.isArray(data.results)) {
		throw new Error('Invalid API response structure');
	  }
	  
	  return data as FetchAddressTransactionsResponse;
	} catch (error) {
	  console.error('Error fetching address transactions:', error);
	  throw error;
	}
  }