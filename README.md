<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbrheader.jpg?raw=true" width="998" height="557">
</h1>

# Contents
- [About](#kawaii-battleroyale-switch-bullet)
- [DeFi No-Loss Games](#defi-no-loss-games)
  - [Stake-to-Play](#stake-to-play)
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


# Cross-Chain Liquidity
<p align="center"></p>
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr-harmony-bridge-liquidity-flow.jpg?raw=true" width="100%">


# DeFi No-Loss Games   
    
<h1 align="center">
  <br>
  <img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr.png?raw=true" width="200" height="200">
</h1>

## Stake-to-Play
# Built for Harmony
<p align="center"></p>
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/kbr2.gif?raw=true" width="100%">
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/selectionScene.gif?raw=true" width="100%">
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/battleScene.gif?raw=true" width="100%">
<img src="https://github.com/OpenDive/KawaiiBattleRoyaleSwitchBullet_Dapp/blob/main/client/public/leaderboard.gif?raw=true" width="100%">

# KBR Gameplay

## NFTS

## Marketplace

# Future Roadmap

# About the Team
Irvin ([@kpatch](https://github.com/kPatch)) and Xiangxu ([@cricel](https://github.com/cricel)) are part of Gitcoin's 2021 KERNEL Fellowship program.   
Tina Xu ([@davinia1991](https://github.com/davinia1991)) and Caitlyn ([@Cait-L](https://github.com/Cait-L)) have recently joined the Cryptochick Incubator program
