import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
require('dotenv').config()

async function main() {
  const [account] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", account.address);
  console.log("Account balance:", (await account.getBalance()).toString());

  const DotoliTokenAddress = '0xFd78b26D1E5fcAC01ba43479a44afB69a8073716';
  const TimeLockAddress = '0xf1B610176319992a4F89D078A6674A076BceaBc8';

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
  console.log("Account balance:", (await account.getBalance()).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});