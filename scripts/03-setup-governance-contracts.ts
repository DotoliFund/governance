import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat";
require('dotenv').config()

async function main() {
  const [account] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", account.address);
  console.log("Account balance:", (await account.getBalance()).toString());

  const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

  const TimeLockAddress = '0xf1B610176319992a4F89D078A6674A076BceaBc8';
  const timeLock = await ethers.getContractAt("TimeLock", TimeLockAddress)
  const DotoliGovernorAddress = '0xae248D0dCC7503126744b510D9B6703F1CaC8870';

  // would be great to use multicall here...
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, DotoliGovernorAddress)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(adminRole, account.address)
  await revokeTx.wait(1)
  // Now, anything the timelock wants to do has to go through the governance process
  console.log("Account balance:", (await account.getBalance()).toString());
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});