<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbrheader.jpg?raw=true" width="998" height="557">
</h1>

# Contents
- [About](#kawaii-battleroyale-switch-bullet)
- [Cross-Chain Liquidity](#cross-chain-liquidity)
- [KBR Gameplay](#kbr-gameplay)
  - [NFTs](#nfts)
  - [Marketplace](#marketplace)

# Kawaii BattleRoyale Switch Bullet
Kawaii Battle Royale (KBR): Switch Bullet is a NO-LOSS team-based multiplayer first-person shooter, similar to games like Overwatch.   


**Except that**, rather than player paying to download the game we implement a **"Stake to Play"** model.
As well as allow players to enter **NO-LOSS Weekly Tournaments**.    

Each tournament has a base entry fee set in Binance USD (BUSD). To enter a tournament the player must stake the entry fee, which gets locked for the duration of the tournament. In return the game, currently, issues a **Tournament Entry NFT** and a set of ERC-20 **KAWAII governance tokens**.   

The Tournament Entry NFT must be later burned to redeem the staked entry once the tournament ends - hence the notion of NO-LOSS.    

For each tournament, the **staked entries are pooled and deposited in a money-market liquidity pool** such as AAVE.   

To accomplish this, we leverage the **Harmony Bridge** to allow our Game Oracle to transfer the staked entries (Harmony BUSD) to Ethereum BUSD and deposit it to AAVE.   

The Game Oracle then monitors the state of the tournament / bracket, issues randomization, and sets the winner of the tournament in the core Game Contract.   

# Demo
https://drive.google.com/drive/u/0/folders/15jI5D1y54QY_2ukZpqiXMcN9OYQ6KtKy

## Contract Addresses

| Contract | ONE  | 0x  |
| :---:   | :-: | :-: |
| Game | ```one1j732q4uqqjl55xvls8uznlrneualna2segkw99``` | ```0x97A2A0578004BF4A199f81f829FC73cF3bf9F550``` |
| Marketplace | ```one19dqgeujxvv8ltpuyxtxyasy0s7pdtnu9ldq7s6``` | ```0x9C944FaB4A3Be972D99857d01F094Df1bA286766``` |
| Game Items (ERC-1155) | ```one1h2duugl6kjtkcazwt0sjy764dj24sjtjqafpf6``` | ```0x9C944FaB4A3Be972D99857d01F094Df1bA286766``` |
| KAWAII Token (ERC-20) | ```one1sd4pasqrlleaqhg8pw0twgm85xv30ltmeh0x8l``` | ```0x836A1Ec003fFf3D05d070b9eb72367A19917Fd7B``` |

# Cross-Chain Liquidity
<p align="center"></p>
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr-harmony-bridge-liquidity-flow.jpg?raw=true" width="100%">


# Overview
    
<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr.png?raw=true" width="200" height="200">
</h1>

# Built for Harmony
<p align="center"></p>
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr2.gif?raw=true" width="100%">
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/selectionScene.gif?raw=true" width="100%">

# KBR Gameplay

<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/battleScene.gif?raw=true" width="100%">
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/leaderboard.gif?raw=true" width="100%">

## NFTS
Four unique character races are released in this initial version: (1) Elves, Humans, Kitsune and Nekomimi. Each is able to weare unique outfits and skins that are represented as NFTs
<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/characters.jpg?raw=true" width="998" height="200">
</h1   
  
<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/weapons.jpg?raw=true" width="998" height="200">
</h1   

Other assets will be later tokenized and affect the tournament gameplay.
    
# Future Roadmap

## DeFi
- Develop arbitrage and flashloan backend to maximize tournament reward
- Integrate other money-market protocols running on Harmony and Ethereum

## Game
- Introduce new battlegrounds / worlds
- Design new characters and personalities
- Design new assets, skins, weapons to represent as NFTs
- Improve game mechanic to allow for magic spells

## Mainnet
- Release and Demo Game at the end of Gitcoin's Fellowship or the CryptoChicks Incubator

# About the Team   
Tina ([@davinia1991](https://github.com/davinia1991)) and Caitlyn ([@Cait-L](https://github.com/Cait-L)) have recently joined the Cryptochick Incubator program.   
Irvin ([@kpatch](https://github.com/kPatch)) and Xiangxu ([@cricel](https://github.com/cricel)) are part of Gitcoin's 2021 KERNEL Fellowship program.

<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/involvement.png?raw=true" width="420" height="240">
</h1>


