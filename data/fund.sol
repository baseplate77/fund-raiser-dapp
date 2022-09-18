toNumbea solidity 0.8.8;

import "./CentralFund.sol";

error FundIsActive();
error NotOwner();
error NoFunds();

contract Fund {
	    string public fundName;
			    string public description;
					    string public goal;

							    uint public immutable createdAt;
									    uint public immutable endAt;
											    address public immutable owner;
													    address public immutable fundAddress;
															    // address[] public immutable docs;

																	    mapping(address => uint256) public donarToAmount;
																			    address[] public donars;
																					    uint256 public nDonar;

																							    uint256 public balance = 0;

																									constructor(
																									        string memory _fundName,
																													        string memory _description,
																																	        string memory _goal,
																																					        address _owner,
																																									        // address[] _docs,
																																													        uint _endAt
																																																	    
																											) {
																										        fundName = _fundName;
																														        description = _description;
																																		        goal = _goal;
																																						        createdAt = block.timestamp;
																																										        endAt = _endAt;
																																														        owner = _owner;
																																																		        // doc = _docs;
																																																						        fundAddress = address(this);
																																																										    
																									}

																									function fund() external payable {
																										        donarToAmount[msg.sender] += msg.value;
																														        balance += msg.value;
																																		        donars.push(msg.sender);
																																						        nDonar += 1;
																																										    
																									}

																									function withdraw() external payable onlyOwner onlyDeactiveFund {
																										        if (balance == 0) revert NoFunds();
																														(bool callSuccess, ) = payable(msg.sender).call{
																															            value: address(this).balance
																																					        
																														}("");
																														        require(callSuccess, "Withdraw failed");
																																		for (uint256 donarIdx = 0; donarIdx < donars.length; donarIdx++) {
																																			            address donar = donars[donarIdx];
																																									            donarToAmount[donar] = 0;
																																															        
																																		}
																																		        donars = new address[](0);
																																						        nDonar = 0;
																																										        balance = 0;
																																														    
																									}

																									modifier onlyOwner() {
																										        // require(msg.sender == owner);
																														        if (msg.sender != owner) revert NotOwner();
																																		        _;
																																						    
																									}

																									modifier onlyDeactiveFund() {
																										        if (block.timestamp < endAt) revert FundIsActive();
																														        _;
																																		    
																									}
																									
}
