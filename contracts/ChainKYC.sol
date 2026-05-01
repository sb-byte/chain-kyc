// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainKYC is Ownable {
    
    struct Customer {
        string dataHash; // IPFS CID of encrypted KYC data
        bool isVerified;
        address verifier; // Bank that verified the KYC
    }

    mapping(address => Customer) public customers;
    mapping(address => bool) public banks;
    mapping(address => bool) public institutions;
    
    // customer => (institution/bank => hasAccess)
    mapping(address => mapping(address => bool)) public accessList;

    event CustomerRegistered(address indexed customer, string dataHash);
    event KYCVerified(address indexed customer, address indexed bank);
    event AccessGranted(address indexed customer, address indexed institution);
    event AccessRevoked(address indexed customer, address indexed institution);
    event BankAdded(address indexed bank);
    event BankRemoved(address indexed bank);
    event InstitutionAdded(address indexed institution);
    event InstitutionRemoved(address indexed institution);

    constructor() Ownable(msg.sender) {}

    modifier onlyBank() {
        require(banks[msg.sender], "Only authorized banks can perform this action");
        _;
    }

    modifier onlyCustomer() {
        require(bytes(customers[msg.sender].dataHash).length > 0, "Not a registered customer");
        _;
    }

    // --- Admin Functions ---

    function addBank(address _bank) external onlyOwner {
        banks[_bank] = true;
        emit BankAdded(_bank);
    }

    function removeBank(address _bank) external onlyOwner {
        banks[_bank] = false;
        emit BankRemoved(_bank);
    }

    function addInstitution(address _institution) external onlyOwner {
        institutions[_institution] = true;
        emit InstitutionAdded(_institution);
    }

    function removeInstitution(address _institution) external onlyOwner {
        institutions[_institution] = false;
        emit InstitutionRemoved(_institution);
    }

    // --- Customer Functions ---

    function registerCustomer(string memory _dataHash) external {
        require(bytes(customers[msg.sender].dataHash).length == 0, "Customer already registered");
        customers[msg.sender] = Customer({
            dataHash: _dataHash,
            isVerified: false,
            verifier: address(0)
        });
        emit CustomerRegistered(msg.sender, _dataHash);
    }

    function updateCustomerData(string memory _newDataHash) external onlyCustomer {
        customers[msg.sender].dataHash = _newDataHash;
        customers[msg.sender].isVerified = false; // Need re-verification
        customers[msg.sender].verifier = address(0);
        emit CustomerRegistered(msg.sender, _newDataHash);
    }

    function grantAccess(address _institution) external onlyCustomer {
        accessList[msg.sender][_institution] = true;
        emit AccessGranted(msg.sender, _institution);
    }

    function revokeAccess(address _institution) external onlyCustomer {
        accessList[msg.sender][_institution] = false;
        emit AccessRevoked(msg.sender, _institution);
    }

    // --- Bank Functions ---

    function verifyKYC(address _customer) external onlyBank {
        require(bytes(customers[_customer].dataHash).length > 0, "Customer not found");
        customers[_customer].isVerified = true;
        customers[_customer].verifier = msg.sender;
        emit KYCVerified(_customer, msg.sender);
    }

    // --- Institution/Bank Functions (Data Retrieval) ---

    function getCustomerData(address _customer) external view returns (string memory, bool, address) {
        // Only allow if the caller is the customer, or if they have been granted access.
        // Banks that verified the customer also have access implicitly, or we can just require explicit access.
        // Let's require explicit access or being the verifier.
        require(
            msg.sender == _customer || 
            accessList[_customer][msg.sender] || 
            customers[_customer].verifier == msg.sender,
            "Access denied"
        );

        Customer memory cust = customers[_customer];
        return (cust.dataHash, cust.isVerified, cust.verifier);
    }

    function checkVerificationStatus(address _customer) external view returns (bool, address) {
        // Anyone can check if a customer is verified (publicly verifiable) without seeing the actual data hash
        Customer memory cust = customers[_customer];
        return (cust.isVerified, cust.verifier);
    }
}
