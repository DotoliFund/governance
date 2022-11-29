import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
require('dotenv').config()

async function main() {
  const [test_account_1] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", test_account_1.address);
  console.log("Account balance:", (await test_account_1.getBalance()).toString());

  const XXXTokenAddress = '0xBFF79e985CFBc53E4FeAFBb2DC1d99d46dd849f9';
  const TimeLockAddress = '0xe68Da1532AA25D0a9312EB9b01bae748Fac46a29';

  // Governor Values
  const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
  // export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
  const VOTING_PERIOD = 1000 // blocks
  const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active

  const XXXGovernor = await ethers.getContractFactory("XXXGovernor");
  const governorContract = await XXXGovernor.deploy(
    XXXTokenAddress,
    TimeLockAddress,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY);
  await governorContract.deployed();
  console.log("XXXGovernor address : ", governorContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});