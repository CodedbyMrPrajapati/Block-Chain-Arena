// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract tracker {
    struct Item {
        uint256 id;
        string name;
        string description;
        string imageUrl;
        address owner;
    }
    uint256 public currid = 1;
    mapping (uint256 => Item) items;
    
    event ItemRegistered(uint256 indexed id, address indexed owner, string name);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);

    function registerItem(string memory _name, string memory _description, string memory _imageUrl) public {
        require(bytes(_name).length > 0, "Name is required");
        Item memory newItem = Item({
            id: currid,
            name: _name,
            description: _description,
            imageUrl: _imageUrl,
            owner: msg.sender
        });
        items[currid] = newItem;
        emit ItemRegistered(newItem.id, newItem.owner, newItem.name);
        currid++;
    }
    function transferOwnership(uint256 id, address newOwner) public {
        require(id>0 && id <= currid, "Invalid ID.");
        require(msg.sender ==  items[id].owner,"Access Denied only the owner can do this action.");
        address prevowner = items[id].owner;
        items[id].owner = newOwner;
        emit OwnershipTransferred(id, prevowner, newOwner);
    }
    function getItem(uint256 id) public view returns (uint256, string memory, address) {
        require(id > 0 && id < currid, "Item does not exist.");
        return (items[id].description, items[id].imageUrl);
    }
}