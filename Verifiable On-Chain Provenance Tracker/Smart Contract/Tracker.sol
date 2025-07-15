// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract tracker {
    struct Item {
        uint256 id;
        string name;
        address owner;
    }
    uint256 public currid = 1;
    mapping (uint256 => Item) items;
    
    event ItemRegistered(uint256 indexed id, address indexed owner, string name);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);

    function registerItem(string memory _name) public {
        Item memory newItem = Item({
            id: currid,
            name:_name,
            owner:msg.sender
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
}