document.addEventListener('DOMContentLoaded', function () {
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
  showSection('provenance'); // Show the first section by default
  
  const contractAddress = "0xYourContractAddress"; // Replace with your contract address
  const contractABI = [ /* Your contract ABI here */ ];
  
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
        this.documentElement = document.getElementById('connectButton');
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
      img.src = itemImage;
      img.onerror = () => {
        showFeedback('Item image URL is invalid. Please provide a valid URL or leave it empty.', feedbackdiv, 'error');
        return;
      }
    }
    if (!contract) {
      showFeedback('Contract is not initialized. Please connect your wallet first.', feedbackdiv, 'error');
      return;
    }
    try {
      const tx = await contract.registerItem(itemName, itemDescription, itemImage);
      await tx.wait();
      showFeedback(`Item registered successfully! Transaction Hash: ${tx.hash}`, feedbackdiv);
    } catch (error) {
      const msg = error.message || "An error occurred while registering the item.";
      showFeedback(msg, feedbackdiv, 'error');
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
          const otherinfo = await contract.getItem(id);
          itemCard.innerHTML = `
          <div class="item-image">
          ${
            otherinfo[1] == '__None__' ? 'div class="image-fallback">N/A</div>' : `<img src="${otherinfo[1]}" alt="Item Image" />`
          }
          </div>
            <div class="item-content">
            <h2 class="item-name">${name}</h2>
            <p class="item-description">Item Id:${id} \n ${otherinfo[0]}</p>
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
      const tx = await contract.transferOwnership(itemId, newOwner);
      await tx.wait();
      showFeedback(`Ownership transferred successfully! Transaction Hash: ${tx.hash}`, feedbackdiv);
    }
    catch (error) {
      const msg = error.message || "An error occurred while transferring ownership.";
      showFeedback(msg,feedbackdiv, 'error');
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
    if (!ethers.BigNumber.isBigNumber(itemId)) {
      showFeedback('Invalid Item ID. Please enter a valid number.', feedbackdiv, 'error');
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
        provenanceItem.innerHTML = `<span class="from">${from}</span> → <span class="to">${to}</span>`;
        provenanceList.appendChild(provenanceItem);
      });
    } catch (error) {
      const msg = error.message || "An error occurred while fetching provenance.";
      showFeedback(msg, feedbackdiv, 'error');
      return;
    }

  });
});
function showFeedback(message,parent,type = 'success',duration = 3000) {
  parent.innerHTML = '';
  const feedback = document.createElement('div');
  feedback.className = `feedback ${type} popFeedback`;
  feedback.id = 'walletFeedback';
  feedback.textContent = message;
  parent.appendChild(feedback);
  setTimeout(() => {
    feedback.remove();
  }, duration);
}