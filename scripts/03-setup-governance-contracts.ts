import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat";
require('dotenv').config()

async function main() {
  const [test_account_1] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", test_account_1.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());

  const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

  const TimeLockAddress = '0x005b1Afae61EF7293ba0391a0a46f93C8f7A2cc4';
  const timeLock = await ethers.getContractAt("TimeLock", TimeLockAddress)
  const XXXGovernorAddress = '0x7eB4cBDe84eF7768F9696467F14Fdd29D304Bde2';

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