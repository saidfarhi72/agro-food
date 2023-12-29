// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SupplyChain {
    address public contractOwner;

    constructor() {
    contractOwner = msg.sender;
}
    struct Product {
        uint productId;
        address producer;
        string name;
        string origin;
        string productionDetails;
        string imageIpfsHash; // IPFS hash or URL for the product image
        uint timestamp;
    }

    struct Participant {
        string participantType;
        string name;
        string contactInfo;
        bool isVerified;
    }


    mapping(address => Participant) public participants;
    Product[] public products;
    uint public productCount;

    mapping(uint => address) public productToOwner;

    event ProductAdded(uint productId, address producer, string name, string origin, string productionDetails, string imageIpfsHash, uint timestamp);
    // Define a struct to store participant information


function registerParticipant(address _participantAddress, string memory _participantType, string memory _name, string memory _contactInfo) public {
    require(bytes(_participantType).length > 0, "Participant type must not be empty.");
    require(bytes(_name).length > 0, "Participant name must not be empty.");
    require(bytes(_contactInfo).length > 0, "Contact information must not be empty.");
    
    require(!participants[_participantAddress].isVerified, "Participant is already registered.");

    participants[_participantAddress] = Participant(_participantType, _name, _contactInfo, false);
}
function verifyIdentity(address _participantAddress, bool _isVerified) public {
    require(msg.sender == contractOwner, "Only authorized authority can verify identities.");
    
    participants[_participantAddress].isVerified = _isVerified;
}

    event OwnershipTransferred(uint productId, address from, address to);

    function addProduct(string memory _name, string memory _origin, string memory _productionDetails, string memory _imageIpfsHash) public {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(bytes(_origin).length > 0, "Product origin cannot be empty");
        require(bytes(_productionDetails).length > 0, "Production details cannot be empty");
        require(participants[msg.sender].isVerified, "Only registered participants can create products.");

        uint timestamp = block.timestamp;

        Product memory newProduct = Product(productCount, msg.sender, _name, _origin, _productionDetails, _imageIpfsHash, timestamp);
        products.push(newProduct);
        productToOwner[productCount] = msg.sender;
        productCount++;

        emit ProductAdded(productCount, msg.sender, _name, _origin, _productionDetails, _imageIpfsHash, timestamp);
    }

    function getProductInfo(uint _productId) public view returns (
        uint productId,
        address producer,
        string memory name,
        string memory origin,
        string memory productionDetails,
        string memory imageIpfsHash,
        uint timestamp
    ) {
        require(_productId < productCount, "Product does not exist");
        Product storage product = products[_productId];
        return (
            product.productId,
            product.producer,
            product.name,
            product.origin,
            product.productionDetails,
            product.imageIpfsHash,
            product.timestamp
        );
    }

    function transferOwnership(uint _productId, address _newOwner) public {
        require(_productId < productCount, "Product does not exist");
        require(msg.sender == productToOwner[_productId], "Only the current owner can transfer ownership");

        productToOwner[_productId] = _newOwner;
        emit OwnershipTransferred(_productId, msg.sender, _newOwner);
    }

    function getParticipantProducts(address _participantAddress) public view returns (uint[] memory) {
    uint[] memory ownedProducts = new uint[](productCount);
    uint counter = 0;

    for (uint i = 0; i < productCount; i++) {
        if (productToOwner[i] == _participantAddress) {
            ownedProducts[counter] = i;
            counter++;
        }
    }

    uint[] memory result = new uint[](counter);
    for (uint j = 0; j < counter; j++) {
        result[j] = ownedProducts[j];
    }

    return result;
}
}
