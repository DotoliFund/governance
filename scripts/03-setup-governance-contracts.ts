import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat";
require('dotenv').config()

async function main() {
  const [test_account_1] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", test_account_1.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());

  const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

  const TimeLockAddress = '0xD3Cad55E70fD46910a8b6Ea4A6F22BB381Ba111a';
  const timeLock = await ethers.getContractAt("TimeLock", TimeLockAddress)
  const XXXGovernorAddress = '0x11848628B03eD9f1c52BD08f0eDf488282EA03Fe';

  // would be great to use multicall here...
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, XXXGovernorAddress)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(adminRole, test_account_1.address)
  await revokeTx.wait(1)
  // Now, anything the timelock wants to do has to go through the governance process
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});