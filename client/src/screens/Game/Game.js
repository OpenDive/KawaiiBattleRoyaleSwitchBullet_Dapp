import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
 
const unityContext = new UnityContext({
  loaderUrl: "unity/myunityapp.loader.js",
  dataUrl: "unity/myunityapp.data",
  frameworkUrl: "unity/myunityapp.framework.js",
  codeUrl: "unity/myunityapp.wasm",
});
 
const App = () => {

  unityContext.on("ConnectToOneWallet", (objectName, callback) => {
    window.ethereum.request({method: "eth_requestAccounts"})
      .then( function(accounts) {
        window.accounts = accounts
        console.log(accounts[0])
        // unityInstance.SendMessage(parsedObjectName, parsedCallback, Pointer_stringify(accounts[0]));
    })
  });

  unityContext.on("ApproveBUSD", (objectName, callback, stakeAmount) => {
    approveBUSD(objectName, callback, stakeAmount);
  });

  
  const approveBUSD = async (objectName, callback, stakeAmount) => {

    let value = "100000";
    let name = "USD Coin";

    usdContract.methods.approve(config.usdContract.address, "100000")
      .send({from: setSelectedAddress})
      .on('error', function(error) {
        console.log('ERROR: ');
        console.log(error);
      })
      .on('receipt', function(receipt) {
        console.log('RECEIPT: ');
        console.log(receipt);
    })
  }

  return (
    <div>
        <Unity unityContext={unityContext} />
    </div>);
};