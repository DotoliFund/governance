import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
require('dotenv').config()

async function main() {
  const [test_account_1] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", test_account_1.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());

  const DotoliTokenAddress = '0x4E318f23D8F6E18aae7F237DDC57C32F3fEe8d8a';
  const TimeLockAddress = '0x3F149037A0A40f2EF0F047F5416E16171ccce3AB';

  // Governor Values
  const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
  const VOTING_PERIOD = 45 // 45818 blocks, 1 week - how long the vote lasts. This is pretty long even for local tests
  const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active

  const DotoliGovernor = await ethers.getContractFactory("DotoliGovernor");
  const governorContract = await DotoliGovernor.deploy(
    DotoliTokenAddress,
    TimeLockAddress,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY);
  await governorContract.deployed();
  console.log("DotoliGovernor address : ", governorContract.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});