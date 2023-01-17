import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
require('dotenv').config()

async function main() {
  const [test_account_1] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", test_account_1.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());

  const DotoliTokenAddress = '0x5D8aa1475Fb7A56229fafcB4e7F2B31264dc0C11';
  const TimeLockAddress = '0x4596A568AE4E6D3121527900901AD700Be7B0188';

  // Governor Values
  const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
  const VOTING_PERIOD = 45818 // 45818 blocks, 1 week - how long the vote lasts. This is pretty long even for local tests
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});