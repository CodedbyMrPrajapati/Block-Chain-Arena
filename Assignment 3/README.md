# Ethereum Item Registry DApp

A decentralized application (DApp) for registering, displaying, transferring, and tracking ownership provenance of items on the Ethereum blockchain. Features a modern, responsive UI with light/dark theme toggle and user-friendly feedback.

---
## Demo Video

A sample video demonstrating the usage of the application is included in this repository.  
Please check the video file showing how to connect the wallet, register items, transfer ownership, and view provenance.

## Features

- **Connect Wallet**: Seamlessly connect with MetaMask or any injected Ethereum wallet.
- **Register Items**: Add new items with name, description, and optional image URL, all stored on-chain.
- **Display Items**: View all registered items in a responsive card grid with previews and full description popups.
- **Ownership Transfer**: Transfer ownership of an item securely to another Ethereum address.
- **Provenance Tracking**: View the full ownership history (provenance) of an item.
- **Dark Mode Toggle**: Switch between light and dark themes for optimal viewing.
- **Responsive Design**: Works well on desktops and mobile devices.
- **Real-time UI Feedback**: Clear success and error messages with smooth animations.

---

## Deployed Contract

- **Contract Address:** `0x83c13f9df2f35c6be2b0b1d0bdfc683555e53856`  
- **Network:** Ethereum Sepolia Testnet  
- **Etherscan Link:** [View Contract on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x83c13f9df2f35c6be2b0b1d0bdfc683555e53856)  

---
## Technologies Used

- **Ethereum Smart Contract** (ABI provided, deployed contract address included)
- **ethers.js**: For blockchain interactions and wallet connection
- **Vanilla JavaScript**: DOM manipulation, event handling, and async blockchain calls
- **CSS Custom Properties & Animations**: Theming, transitions, and responsive UI elements

---

## Getting Started

### Prerequisites

- [MetaMask](https://metamask.io/) or compatible Ethereum wallet browser extension installed
- Access to Ethereum testnet/mainnet depending on contract deployment

### Installation

1. Clone or download this repository.
2. Open the `index.html` in a modern browser with MetaMask enabled.
3. Connect your wallet using the **Connect Wallet** button.
4. Use the tabs to register items, display items, transfer ownership, or view provenance.

---

## Usage

### Register an Item

- Fill in the **Item Name** (required), **Description** (optional), and **Image URL** (optional).
- Click **Register**.
- If successful, the item is recorded on-chain, and you receive a transaction hash confirmation.

### Display Items

- Click on the **Display Items** tab.
- All registered items will load as cards.
- Click on an item card to view its full description in a popup.

### Transfer Ownership

- Provide the **Item ID** and the **New Owner’s Ethereum Address**.
- Click **Transfer** to execute ownership transfer transaction.

### Provenance

- Enter the **Item ID**.
- Click **Show Provenance** to view ownership history of the item.

---

## UI/UX Details

- **Theme Toggle**: Easily switch between a bright cream/light theme and a dark mode with smooth color transitions.
- **Feedback System**: Success and error messages appear prominently with fade and slide animations.
- **Item Cards**: Responsive grid layout with image fallback for missing images.
- **Full Description Popup**: Animated and timed popup showing complete item description on item click.
- **Provenance List**: Clean, stylized list with animated entries showing ownership transfers.

---

## Code Highlights

- Robust input validation including URL format checks and max description length enforcement.
- Graceful error handling for wallet connection, transaction failures, and blockchain queries.
- Use of ethers.js `filters` and `queryFilter` to retrieve contract events efficiently.
- CSS variables for seamless theming and capsule-shaped toggle button.
- Subtle animations (`fallDown`, `fadeInLeft`, `popInOut`) enhance user experience without distractions.

---
## Deployment and Usage

