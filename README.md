# SSI_POC
A PoC (Proof-of-Concept) of a Self-Sovereign Identity Solution, implemented using blockchain technology.

An SSI system is a decentralized identity management system. However, unlike a centralized identity provider, no single entity is responsible for managing credentials on behalf of the holder. Here, the holder is responsible to manage and distribute their identity. <br>

The system gives more autonomy to the user by decentralizing the power to one's own identity. Hence, the name Self-Sovereign.<br>

## Understanding SSI

An SSI System usually comprises three entities in the process:
1. **Issuer**: The entity responsible for issuing a credential. E.g.: RTO, Passport Authority, etc.
2. **Holder/Presenter**: The entity usually represents a nominal/ordinary person, the holder of the credential, issued by the verifier. The term 'holder' is referred to when credentials are received. The term 'presenter' specifies the role of presentation of the accepted credentials. E.g.: Driver (holding diver's license), Citizen (having citizenship ID of the respective nation).
3. **Verifier**: The entity requesting or validating the received proposal from the presenter of the credentials. E.g.: Insurance agency (providing insurance on the basics of credentials received from the presenter).

## The PoC

Our PoC tries to imitate the flow of the SSI system. It provides a platform for simulating the complete flow of how the credential flow might work in a real-world use case. <br>


### Architecture

The project can be divided as further: <br>
1. Application logic: This contains the complete backend and frontend required for an application. The components include as follows <br>
    1. Front-end: A react front end including registration, login, and routing to  role-based individual pages. The pages include a holder, an issuer, and a verifier page
    2. Backend: An Expressjs backend for routing of requests and to call wrapper, application layer services. (They further make calls to the wrapper APIs).
    3. Database: A SQL database with columns as:
        1. id (int): unique incremental id starting from 0, to uniquely identify each user.
        2. username (varchar): A unique credential used for verification purposes.
        3. password (varchar): hashed and salted password stored in db for verification.
        4. usertype (varchar): Type of user based on role, viz. Issuer, Holder, Verifier.
        5. displayname (varchar): Name to be displayed once logged in and also used to determine the sender of credentials and presentations.
        6. schema_id (varchar): Only for issuers. To store the on-chain schema_id of the credentials to be issued.
        7. cred_def_id (varchar): Only for issuers. To store a unique identifier for the issuer ready to issue credentials.
        8. credentials (varchar): Only for Holders. A list of credentials received in the wallet, stored for convenience.

2. Wrapper APIs: This contains the Nestjs backend with Individual APIs for agents, connection, credential-definition, holder, issuance, present-proof, and schema. All the APIs are custom made and auto flags are enabled for the majority of endpoints, with the use of only mandatory variables keeping the flow easy to understand.

<p align="center"> <img src="./assets/System Architecture.jpeg" alt = "System Architecture.jpeg"></p>
Pictorially the architecture can be represented as above.

## How to

### How to Start the Application

The application is actually comprised of three applications simultaneously running viz.: The React front-end, Node backend, and Nextjs wrapper APIs. Along with the ACA-py agents running individually. The normal application flow usually includes starting a docker container for each, individual user's agent. However, here a dedicated environment was created and the agents were independently started. This is doable for a PoC and needs to be looked upon in case of creating a full-fledged application.

As mentioned, we need to start a total of three applications:
1. From the root directory:  ``` cd .\Application-logic\clientt ``` and run the following command <code> $ npm start </code>. This starts the React client on http://localhost:3000. Here, according to the flow redirection to pages takes place.
2. To start the backend concurrently ``` cd .\Application-logic\server ``` in the new terminal, from the root folder. With the <code> $ npm start </code> command, start the backend. Make sure to create a SQL database with the above-mentioned columns and update the ```.env``` file accordingly with the credentials required and mentioned.
3. To start the wrapper APIs go to ``` cd .\wrapper-APIs ``` and run ``` $ npm start ``` in the new terminal. This will result in starting the final component of our application.
4. Apart from this, there is also a need to start ACA-py agents. Follow this [tutorial](https://github.com/hyperledger/aries-cloudagent-python/blob/main/DevReadMe.md#locally-installed) to proceed with the setup locally. Once the installation is done, run the following commands in individual terminals to start the required three agents:
    1. To start the issuer agent run the following command <br><code>aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user1 --wallet-name user1 --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:8001 --inbound-transport http 0.0.0.0 8001 --outbound-transport http --log-level DEBUG --admin 0.0.0.0 9001 --label user1 --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision </code>
    2. To start the holder agent, run the following command <br> <code>aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user2 --wallet-name user2 --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:8002 --inbound-transport http 0.0.0.0 8002 --outbound-transport http --log-level DEBUG --admin 0.0.0.0 9002 --label user2 --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision</code>
    3. To start the verifier agent, run the following command <br> <code>aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user3 --wallet-name user3 --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:8003 --inbound-transport http 0.0.0.0 8003 --outbound-transport http --log-level DEBUG --admin 0.0.0.0 9003 --label user3 --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection –auto-provision</code>
    4. Apart from this, additional flow must be followed in order to make issuer-did public. This requires starting a steward agent with the following command <br> <code>aca-py start --wallet-name steward1 --wallet-key steward1 --wallet-type indy --genesis-url http://test.bcovrin.vonx.io/genesis --inbound-transport http 0.0.0.0 8000 --admin 0.0.0.0 9000 --endpoint http://0.0.0.0:8000 --outbound-transport http --log-level DEBUG --admin-insecure-mode --label steward1 --auto-ping-connection --auto-accept-invites --auto-accept-requests --seed 000000000000000000000000Steward1 --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-store-credential --auto-provision --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-verify-presentation</code><br>
    More about the flow is specified [here](https://docs.google.com/document/d/1pzcs_ZYcLGkZKOpPoL1zF8Xfk1tMg-BI3YH1BOXAaCk/edit?usp=sharing).
In the document under *Issuing* tab follow steps from #1 to #5 in order to make did public for the issuer and for creating a [schema](https://hyperledger.github.io/indy-did-method/#schema) and [credential-definition-id](https://hyperledger.github.io/indy-did-method/#cred-def) for the issuer with the help of the steward wallet. These values are mandatory in the further flow.
