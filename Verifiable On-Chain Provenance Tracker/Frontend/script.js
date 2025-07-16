document.addEventListener('DOMContentLoaded', function () {
  
  const fullItemDesc = document.getElementById('fullitemdesc');
  const toggleTheme = document.getElementById('themeToggle');
  toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')){
        toggleTheme.textContent = 'Dark';
      } else {
        toggleTheme.textContent = 'Light';
      }
  });
  const links = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('.tab-section');
  function showSection(id) {
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === id) {
        section.classList.add('active');
      }
    });
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      showSection(target);
    });
  });
  showSection('displayItems'); // Show the first section by default
  
  const contractAddress = "0x83c13f9df2f35c6be2b0b1d0bdfc683555e53856"; // Replace with your contract address
  
  const contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "ItemRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "currid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "registerItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

  let provider;
  let signer;
  let contract;
  const home_tab_feedbacks = document.getElementById('hometabfeedbacks');
  document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum == 'undefined') {
      showFeedback('Please install MetaMask or another Ethereum wallet extension.', home_tab_feedbacks, 'error');
      }
    else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        showFeedback(`Connected to wallet: ${accounts[0]}`, home_tab_feedbacks);
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        Button = document.getElementById('connectButton');
        Button.textContent = 'Connected';
        Button.disabled = true;
        Button.style.backgroundColor = `var(--confirmation-color)`;
      }
      catch (error) {
        const msg = error.message || "An error occurred while connecting to the wallet.";
        showFeedback(msg, home_tab_feedbacks, 'error');
        return;
      }
    }
    });

  document.getElementById('RegisterFormbutton').addEventListener('click', async (e) => {
    e.preventDefault();
    const feedbackdiv = document.getElementById('registrationfeedback');
    const itemName = document.getElementById('itemName').value;
    if (!itemName) {
      showFeedback('Item name is required.', feedbackdiv, 'error');
      return;
    }
    const itemDescription = document.getElementById('itemDescription').value || '__None__';
    const itemImage = document.getElementById('itemImage').value || '__None__';
    console.log("Registering item:", itemName, itemDescription, itemImage);
    if (!(itemImage == '__None__')){
      console.log("Item image provided:", itemImage);
      if (!itemImage.startsWith('http://') && !itemImage.startsWith('https://')) {
        showFeedback('Item image URL is invalid. Please provide a valid URL or leave it empty.', feedbackdiv, 'error');
        return;
      }
      const img = new Image();
      let validImage = false;
      img.src = itemImage;
      img.onload = () => {
        validImage = true;
      }
      img.onerror = () => {
        showFeedback('Item image URL is invalid. Please provide a valid URL or leave it empty.', feedbackdiv, 'error');
        validImage = false;
      }
      if (!validImage) {
        return;
      }
    }
    if (itemDescription.length > 1000) {
      showFeedback(`Item description is too long. Please limit it to 1000 characters.\n Current characters count : ${itemDescription.length}`, feedbackdiv, 'error');
      return;
    }
    if (!contract) {
      showFeedback('Contract is not initialized. Please connect your wallet first.', feedbackdiv, 'error');
      return;
    }
    try {
      console.log("Attempting to register item with contract:", contract);
      console.log("Item details:", itemName, itemDescription, itemImage);
      // Register the item on the blockchain
      const tx = await contract.registerItem(itemName, itemDescription, itemImage , {gasLimit: 30000000});
      await tx.wait();
      showFeedback(`Item registered successfully! Transaction Hash: ${tx.hash}`, feedbackdiv);
    } catch (error) {
      const msg = error.message || "An error occurred while registering the item.";
      showFeedback(msg, feedbackdiv, 'error');
      console.log(error);
    }
  });
  
  document.getElementById('displayItems').addEventListener('click', async () => {
    const feedbackdiv = document.getElementById('displayItemfeedback');
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = ''; 
    if (!contract) {
      showFeedback('Contract is not initialized. Please connect your wallet first.', feedbackdiv, 'error');
      return;
    }
    try {
      const filter = contract.filters.ItemRegistered();
      const events = await contract.queryFilter(filter);
      events.forEach(async event => {
          const { id, owner, name } = event.args;
          const itemCard = document.createElement('div');
          itemCard.className = 'item-card falldown';
          itemCard.onclick = (e) => {
            const desc = document.getElementById(`fulldesc${id}`).textContent;
            showFullItemDesc(e, desc);
          }
          itemCard.id = id;
          const otherinfo = await contract.getItem(id);
          itemCard.innerHTML = `
          <div class="item-image">
          ${
            otherinfo[1] == '__None__' ? '<div class="image-fallback">N/A</div>' : `<img src="${otherinfo[1]}" alt="Item Image" />`
          }
          </div>
            <div class="item-content">
            <h2 class="item-name">${name}</h2>
            <p class="item-description">Item Id:${id} \n ${otherinfo[0] == '__None__' ? '':
              otherinfo[0].length > 100 ? otherinfo[0].substring(0, 100) + '...' : otherinfo[0]
            }</p>
            <p id='fulldesc${id}' style="display:none;" id="fullitemdesc">${otherinfo[0]}</p>
            <p class="item-owner">Owner: ${owner}</p>
            </div>`
            itemsContainer.appendChild(itemCard);
      });
      if (events.length === 0) {
        showFeedback('No items registered yet.', feedbackdiv, 'error');
      }
      this.textContent = 'Refresh Items';
    } catch (error) {
      const msg = error.message || "An error occurred while fetching items.";
      showFeedback(msg, feedbackdiv, 'error');
      console.log(error);
      return;
    }
  });
  document.getElementById('transferbutton').addEventListener('click', async (e) => {
    e.preventDefault();
    const feedbackdiv = document.getElementById('transferfeedback');
    const itemId = document.getElementById('itemIdForTransfer').value.trim();
    const newOwner = document.getElementById('newOwner').value.trim();
    console.log(itemId, newOwner);
    if (!itemId || !newOwner) {
      console.log(itemId, newOwner);
      showFeedback('Item ID and new owner address are required.', feedbackdiv, 'error');
      return;
    };
    if (!contract) {
      showFeedback('Contract is not initialized. Please connect your wallet first.', feedbackdiv, 'error');
      return;
    } 
    if (!ethers.utils.isAddress(newOwner)) {
      showFeedback('Invalid new owner address.', feedbackdiv, 'error');
      return;
    }
    try {
      const tx = await contract.transferOwnership(itemId, newOwner,{gasLimit: 200000});
      await tx.wait();
      showFeedback(`Ownership transferred successfully! Transaction Hash: ${tx.hash}`, feedbackdiv);
    }
    catch (error) {
      console.log(error);
      let msg = error.message || "An error occurred while transferring ownership.";
      if( error.message.includes('CALL_EXCEPTION') || error.message.includes('revert')) {
        msg = "Ownership transfer failed. Please check if the item ID exists and you are the current owner.";
      }
      console.log(error);
      console.log(msg);
      showFeedback(msg, feedbackdiv, 'error');
    }
  });
  document.getElementById('provenanceButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const provenanceList = document.querySelector('.provenance-list');
    provenanceList.innerHTML = '';

    const feedbackdiv = document.getElementById('provenanceFeedback');
    const itemId = document.getElementById('itemIdForProvenance').value.trim();
    if (!itemId) {
      showFeedback('Item ID is required.', feedbackdiv, 'error');
      return;
    }
    if (!contract) {
      showFeedback('Contract is not initialized. Please connect your wallet first.', feedbackdiv, 'error');
      return;
    }
    try {
      const filter = contract.filters.OwnershipTransferred(itemId, null, null);
      const events = await contract.queryFilter(filter);
      if (events.length === 0) {
        showFeedback('No provenance found for this item.', feedbackdiv, 'error');
        return;
      }
      events.forEach(event => {
        const { id , from, to } = event.args;
        const provenanceItem = document.createElement('li');
        provenanceItem.className = 'falldown';
        provenanceItem.innerHTML = `<span class="from">${
          from.length > 20 ? from.substring(2, 10) + '...' + from.substring(from.length - 10) : from.substring(2,)
        }</span> → <span class="to">${
          to.length > 20 ? to.substring(2, 10) + '...' + to.substring(to.length - 10) : to.substring(2,)
        }</span>`;
        provenanceList.appendChild(provenanceItem);
      });
    } catch (error) {
      const msg = error.message || "An error occurred while fetching provenance.";
      showFeedback(msg, feedbackdiv, 'error');
      return;
    }
  });
});
function showFullItemDesc(e,desc){
  e.stopPropagation();
  e.preventDefault();
  const fullItemDesc = document.getElementById('fullitemdesc');
  fullItemDesc.textContent = desc || 'No description available.';
  fullItemDesc.style.display = 'block';
  fullItemDesc.style.animation = 'fadeIn 0.3s ease-in-out';
  if (fullItemDesc.hideTimeout) {
    clearTimeout(fullItemDesc.hideTimeout);
  }
  fullItemDesc.hideTimeout = setTimeout(() => {
    fullItemDesc.style.display = 'none';
    fullItemDesc.style.animation = 'fadeOut 0.3s ease-in-out';
  }, 2000);
}
function showFeedback(message,parent,type = 'success',duration = 3000) {
  parent.innerHTML = '';
  const feedback = document.createElement('div');
  feedback.className = `feedback ${type} popFeedback`;
  feedback.textContent = message;
  parent.appendChild(feedback);
  setTimeout(() => {
    feedback.remove();
  }, duration);
}