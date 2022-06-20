# Heptagon-Encode

<img src="https://i.ibb.co/2M4VnsX/heptagon-blanco-1.png">

Heptagon is a Polygon based DeFi dapp that works in tandem with ChainLink, CovalentAPI, IPFS and Rapyd to offer a fiat ramp, price data feeds, cash out and an Instant messenger where you can chat and send Matic tokens and NFTs through chat or by scanning the QR.

**IF YOU'RE A JUDGE YOU CAN TEST OUR APPLICATION HERE:**

WEBAPP: https://main.dr7re3fv4iad9.amplifyapp.com/

- email: hexagon@chainlink.com 
- password: toortoor

# Introduction and Problem

Over the last decade, most economies in Latin America and the Caribbean have displayed sustained growth and macroeconomic stability leading to the emergence of growing middle classes. Despite these advances, poverty and inequality levels remain high and financial exclusion still affects important sectors of the population, which can hinder future economic and social development.

<img src="https://res.cloudinary.com/devpost/image/fetch/s--Rn6E347O--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://i.ibb.co/dDjj6Hb/image.png">

El Salvador’s experiment with Bitcoin has justifiably intrigued much of the financial world. That focus might be missing the much larger story. Regardless of the outcome of El Salvador’s cryptocurrency venture, mobile phones, fintech, DeFi, blockchain technology, and cryptocurrency, are poised to dramatically alter banking and commerce, and potentially economic stability, throughout the region.

<img src="https://res.cloudinary.com/devpost/image/fetch/s--gHa-ga0s--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://i.ibb.co/TwLR1fZ/image.png">

Nevertheless there are several challenges, an estimated 70% of economic transactions in Latin America are all cash. And just 50% has bank accounts. But, in contrast 78% has a cellphone with internet connection and among those more than 99% use Instant messenger apps. We think that the region is set to jump this chasm and generate new economies based in these technologies such as the jump several countries had from nothing to mobile phones without passing through landlines.

We just need the correct tools, applications and technologies.

# Diagram:

<img src="https://i.ibb.co/xJJCX0N/Cheme-drawio.png">

- The main services we are using is Polygon, ChainLink, Covalent API, IPFS and Rapyd.
- Polygon is our main blockchain, where thanks to its low fees we can provide the following services.
  - Decentralized Chat.
  - Transfer tokens and NFT's
 - Chainlink, thanks to its data feeds, provides us with the possibility of consuming them directly within a smart contract, in this case we use a contract deployed in Polygon Mainnet as a bridge to provide our dapp with the prices of BTC, BNB, USDC, MATIC, LINK and ETH.
- CovalentAPI provides us with a very efficient API to obtain data from our NFT's and Token balances in our account.
- Rapyd allows us, on your side, to carry out the KYC to use the Fiat services and also to checkout our fiat money through a virtual card or transfer.
- The Swap is the only section where we coordinate Rapyd and Polygon services to be able to exchange MATIC to Fiat money.

# Walkthrough:

You can find the link, login and password to use our application at the top. Once inside the platform you will see our Chainlink-based price feed as the first screen.

<img src="https://i.ibb.co/VQ7MCwJ/image.png">

At the second phone in the image we can see that this feed is based on the data feeds of Polygon Mainnet. As you can see the prices shown on the website are the same as in our Dapp since they come from the same source, the contract as already mentioned is displayed in the polygon network mainet.

In turn we show the contract directly in Remix to show that we are consuming its Data Feeds.

<img src="https://i.ibb.co/9pGYKhg/New-Project.png">

Next (third phone on the image with three phones) we can see our balances and transactions of Fiat and Crypto. All balances of the NFT tokens and the Matic are obtained from the Covalent APIs.

<img src="https://i.ibb.co/jvs24kD/image.png">

Code:

    let res = await this.axios({
        method: 'get',
        url: `https://api.covalenthq.com/v1/80001/address/${this.context.value.cryptoaddress.address}/balances_v2/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXX&format=JSON&nft=true&no-nft-fetch=false`,
        headers: {
            'Accept': 'application/json'
        },
        cancelToken: this.source.token
    })

Finally, in the last button you can complete the KYC through Rapyd to verify your identity.

In the swap section (first phone in the next image) we can make an exchange between our Fiat account and our crypto account, we only have to select if we want to convert Crypto to Dollar or Dollar to Crypto. Once the transaction is signed and the operation is finished in the home section we will be able to see how we have already received our money in our Fiat account and deducted it from our Crypto account.

<img src="https://i.ibb.co/2vBwdSq/New-Project-2.png">

In our Cash out section (Second phone in the image above) we will have 2 options, generate a virtual debit card where we can use our Fiat money or make an electronic transfer to another debit card, either visa or mastercard.

## Messenger:

Since each message is sent to a smart contract, we must sign the transaction and pay the fee for the transaction. Once the message is sent, we can see it appear in the chat.

<img src="https://i.ibb.co/HxJCq3D/New-Project-3.png">

We have to mention that everything regarding the messenger was developed with Polygon and every transaction or message is wallet signed in the background.

https://github.com/altaga/Heptagon-Encode/blob/main/Contracts/Chat.sol

At the same time we integrate a chat section, where we can talk to any address on the same network, first we put the address with which we want to talk and we can start sending messages, in this case it is possible to send messages, send attached money or even send an NFT.

## QR Transfer:

<img src="https://i.ibb.co/BsMWK9N/New-Project-4.png">

<img src="https://i.ibb.co/MCtJvTQ/New-Project-5.png">

# References

https://www.caf.com/en/currently/news/2020/08/inclusion-and-financial-literacy-keys-to-reducing-gaps-in-latin-america-and-the-caribbean/#:~:text=In%20Latin%20America%20and%20the%20Caribbean%2C%20while%20financial%20inclusion%20levels,access%20to%20formal%20financial%20services.

https://iamericas.org/latin-america-in-crypto-defi-cbdc-blockchain-transition/
