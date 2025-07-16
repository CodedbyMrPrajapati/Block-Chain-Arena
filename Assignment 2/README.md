# TLDR;
The code is in SimulationofaP2pCryptocurrencyNetwork notebook and is divided and has several classes defined which can be understood through report provided. The code uses:
- random
- queue 
- time 
- uuid 
- heapq
- matplot 
- networkx 
Install the required external packages using:

```bash
pip install matplotlib networkx
```

# Blockchain Arena – Project 1: Simulation of a P2P Cryptocurrency Network

---

## 📘 Overview

This project simulates a **P2P cryptocurrency network** using a **discrete-event simulator** built in Python. The simulator models:

- Peer-to-peer transaction and block propagation,
- Latency-aware message delivery,
- Proof-of-Work mining,
- Blockchain tree growth and fork resolution.

The simulator builds upon the P2P topology designed in Assignment 1 and adds a decentralized event-driven engine to model realistic blockchain behavior like that of Bitcoin.

---

## 🏗️ Key Components

### ✅ Discrete Event Simulator
- Central event queue (`heapq`) processing chronologically.
- `Event` class manages different event types (e.g., `Gen_txn`, `Rec_txn`, `Gen_block`, `Rec_block`).

### ✅ Network Model
- Randomly generated P2P topology using NetworkX.
- Each peer has:
  - A `speed` classification (Slow / Fast),
  - A CPU power classification (Low / High),
  - A coin balance and blockchain tree.
- Latency formula:  
  `L_ij = ρ_ij + |m| / c_ij + d_ij`, where:
  - `ρ_ij` is random propagation delay,
  - `c_ij` is link bandwidth,
  - `d_ij` is exponential queuing delay.

### ✅ Blockchain Tree
- Each peer maintains a `BlockchainTree`.
- Supports:
  - Adding and validating blocks,
  - Fork resolution using the longest chain rule,
  - Tracking and visualizing all chains.

### ✅ Transactions
- Generated using exponential interarrival times (Poisson process),
- Format: `TxnID: IDx pays IDy C coins`,
- Ensures sender has sufficient coins before inclusion in a block.

### ✅ Blocks
- Mined only on the longest chain tip,
- Block size limit: 1MB (including transactions and coinbase),
- Each successful block adds 50 coins to miner via coinbase transaction.

---

## 📊 Experiments & Parameters

### 📌 Configurable Parameters:
- `n`: Number of peers
- `z0`: Fraction of slow nodes
- `z1`: Fraction of low CPU nodes
- `Ttx`: Mean transaction interarrival time
- `I`: Expected block interval (e.g., 600 seconds)

### 📌 Sample Parameters Used:
```python
n = 10
z0 = 0.1    # 10% slow nodes
z1 = 0.2    # 20% low CPU nodes
Ttx = 10    # avg. time between transactions
I = 600     # block interarrival time
```
## 📘 Project Structure & Dependencies

The main code for this simulation is contained in the Jupyter notebook:  
**`SimulationofaP2pCryptocurrencyNetwork.ipynb`**

The implementation is modular and well-structured, with several classes defined to encapsulate the behavior of key components such as:

- `Event` – for discrete event simulation
- `Transaction` – for transaction creation and validation
- `Block` – for mining and validation
- `BlockchainTree` – to maintain and resolve blockchain forks
- `Peer` – representing each node in the network
- `Network` – for P2P graph construction and latency modeling
- `Simulator` – the main simulation controller

A detailed explanation of the architecture and class responsibilities is provided in the accompanying **report**.

### 🛠️ Dependencies

The simulation relies on the following Python libraries:

- `random` – for stochastic behavior (e.g., transaction and event timing)
- `queue` – for BFS-based connectivity checks
- `time` – for graph regeneration timeouts
- `uuid` – to generate unique transaction and block IDs
- `heapq` – to implement the event priority queue
- `matplotlib` – for visualization of the blockchain tree and P2P network
- `networkx` – for graph construction and manipulation

Install the required external packages using:

```bash
pip install matplotlib networkx
```
