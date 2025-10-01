# Stacks Account History - Mini Block Explorer

A simple mini-block-explorer for viewing Stacks blockchain transaction history. This Next.js application allows users to connect their Stacks wallet or search for any valid Stacks address to view transaction history with pagination.

## Features

- 🔗 **Wallet Connection**: Connect your Stacks wallet (Leather, Xverse, etc.)
- 🔍 **Address Search**: Search for any valid Stacks mainnet address
- 📄 **Transaction History**: View detailed transaction history with pagination
- ⚡ **Load More**: Paginated results (20 transactions per page)
- 🎨 **Clean UI**: Simple and intuitive interface

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Connect Wallet**: Click "Connect Wallet" to connect your Stacks wallet
2. **Search Address**: Enter any valid Stacks mainnet address (starts with "SP") in the search bar
3. **View History**: Browse through transaction history with pagination
4. **Load More**: Click "Load More" to fetch additional transactions

## Technical Details

- **Network**: Stacks Mainnet only
- **Pagination**: 20 transactions per page
- **API**: Uses Hiro's Stacks API for transaction data
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS

## Project Structure

```
├── components/          # React components
│   ├── navbar.tsx      # Navigation bar with search
│   ├── txns-list.tsx   # Transaction list component
│   └── txn-details.tsx # Individual transaction details
├── hooks/              # Custom React hooks
│   └── use-stacks.ts   # Stacks wallet integration
├── lib/                # Utility functions
│   ├── fetch-address-transactions.ts
│   └── stx-utils.ts
└── src/app/            # Next.js app router pages
    ├── [address]/      # Dynamic address page
    └── page.tsx        # Home page
```

## Built With

- [Next.js](https://nextjs.org) - React framework
- [@stacks/connect](https://github.com/stacks-network/connect) - Stacks wallet integration
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Type safety
