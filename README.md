## 📚 Overview
Hey , I am **Piyush Prajapati** (Roll No : **24B0930**) . This repo is corresponding to my SOC project under WNCC under my soc mentor **Soumitra Darshan Nayak** .
This repository contains three key projects related to blockchain technology and decentralized applications, completed as part of the **Blockchain Arena** course and related assignments. These projects demonstrate core concepts including P2P network simulation, discrete event-driven blockchain simulation, and building a decentralized item registry on Ethereum.

---

## 🚀 Projects Summary

### 1. **P2P Network Simulation (Assignment 1)**

- **Goal:** Generate and visualize a connected peer-to-peer network of blockchain nodes.
- **Key Features:**
  - Random number of peers (50-100), each connected to 3-6 others.
  - Ensured network connectivity using BFS.
  - Visualization using NetworkX and Matplotlib with Kamada-Kawai layout.
  - Output saved as `network.png`.
- **Technologies:** Python, NetworkX, Matplotlib.
- **Learnings:**
  - Understanding graph theory fundamentals applied to blockchain P2P networks.
  - Practical use of BFS for connectivity checks.
  - Network topology’s importance in blockchain performance and security.

---

### 2. **Simulation of a P2P Cryptocurrency Network (Project 1)**

- **Goal:** Model a realistic blockchain network using discrete-event simulation.
- **Key Features:**
  - Event-driven simulator modeling transaction/block propagation and mining.
  - Peers categorized by speed and CPU power influencing mining and network latency.
  - Blockchain forks and resolution using longest chain rule.
  - Transaction generation with validation and coinbase rewards.
  - Network latency modeled with propagation, bandwidth, and queuing delays.
- **Technologies:** Python (random, heapq, uuid, networkx, matplotlib).
- **Learnings:**
  - Discrete-event simulation techniques for asynchronous network behavior.
  - Mining, block propagation, and fork management fundamentals.
  - Realistic latency modeling impact on decentralized consensus.
  - Integration of network topology with blockchain protocol simulation.

---

### 3. **Ethereum Item Registry DApp**

- **Goal:** Build a decentralized application for item registration and ownership provenance on Ethereum.
- **Key Features:**
  - Wallet connection via MetaMask.
  - On-chain item registration with name, description, and image.
  - Ownership transfer with full provenance tracking.
  - Responsive UI with light/dark mode toggle and smooth animations.
  - Real-time feedback for transactions and interactions.
- **Technologies:** Solidity (smart contract), ethers.js, JavaScript, CSS.
- **Deployed on:** Sepolia Testnet (Contract Address: `0x83c13f9df2f35c6be2b0b1d0bdfc683555e53856`).
- **Learnings:**
  - Smart contract design and deployment on Ethereum testnet.
  - Frontend integration with blockchain via ethers.js.
  - User experience considerations in DApps, including theming and responsive design.
  - Event filtering and asynchronous blockchain queries for provenance.

---

## 🛠️ Common Dependencies

For Python projects:

```
pip install matplotlib networkx
```

For the DApp:

- MetaMask or compatible Ethereum wallet
- Modern web browser

---

## 📖 Key Takeaways & Skills Developed

- **Blockchain Networks:** Deep understanding of P2P network structures and their role in decentralized systems.
- **Simulation Modeling:** Mastered discrete event simulation to replicate real-world blockchain dynamics.
- **Blockchain Consensus & Forks:** Hands-on experience with mining, fork resolution, and transaction validation.
- **Ethereum Smart Contracts:** Practical smart contract development, deployment, and frontend interaction.
- **UI/UX Design for DApps:** Building user-friendly, responsive, and theme-adaptive blockchain applications.
- **Latency and Network Effects:** Studied impact of network delays and CPU power on blockchain propagation and consensus.

---