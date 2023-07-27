# Dotoli governance

This repository contains the governance smart contracts for the Dotoli Protocol.

## Smart Contract
Used `@openzeppelin/contracts/governance`

### DotoliGovernor

```
QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
VOTING_PERIOD = 45818 // 45818 blocks, 1 week
VOTING_DELAY = 1 // 1 Block  How many blocks till a proposal vote becomes active
```

### TimeLock
After a vote passes, you have 1 hour before you can enact.
  
```
MIN_DELAY = 3600 // 1 hour
proposers = []
executors = []
```

## Contract Address

| Contract         | Mainnet Address | 
| ----------------------------------- | ---------------------------------------- | 
| [DotoliGovernor](https://github.com/DotoliFund/governance/blob/master/contracts/DotoliGovernor.sol)                                                    | `0xae248D0dCC7503126744b510D9B6703F1CaC8870`           | 
| [TimeLock](https://github.com/DotoliFund/governance/blob/master/contracts/TimeLock.sol)                                                                   | `0xf1B610176319992a4F89D078A6674A076BceaBc8`           | 


## Licensing

Inspired by Uniswap V3
```
MIT
```
