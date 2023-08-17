# SSI_POC
A PoC (Proof-of-Concept) of a Self-Sovereign Identity Solution, implemented using blockchain technology.

An SSI system is a decentralized identity management system. However, unlike a centralized identity provider, no single entity is responsible to manage credentials on behalf of the holder. Here, the holder are responsible to manage and distribute their identity. <br>

The system gives more autonomy to the user by decentralizing the power to one's own identity. Hence, the name Self-Sovereign.<br>

## Understanding SSI

An SSI System usually comprises three entities in the process:
1. **Issuer**: The entity responsible for issuing a credential. E.g.: RTO, Passport Authority, etc.
2. **Holder/Presenter**: The entity usually represents a nominal/ordinary person, the holder of the credential, issued by the verifier. The term 'holder' is referred to when credentials are received. The term 'presenter' specifies the role of presentation of the received credentials. E.g.: Driver (holding diver's license), Citizen (holding citizenship id of the respective nation).
3. **Verifier**: The entity requesting or validating the received proposal from the presenter of the credentials. E.g.: Insurance agency (providing insurance on the basics of credentials received from the presenter).

## The PoC

Our PoC tries to imitate the flow of the SSI system. It provides a platform for simulating the complete flow of how the credential flow might work in a real-world use case. <br>


### Architecture

The project can be divided as further: <br>
1. Application logic: This contains the complete backend and frontend required for an application. The components include as follows <br>
    i. Front-end: A react front end including registration, login, routing to  role based individual pages. The pages including a holder, an issuer and a verifier page
    ii. Backend: A Expressjs backend for routing of requests and to call wrapper, allpication layer services. (They further make calls to the wrapper-APIs).
    iii. Database: A SQL database with columns as:
        1. id (int): unique incremental id starting from 0, to uiquely identify each user.
        2. username (varchar): A unique credential used for verification purposes.
        3. password (varchar): hashed and salted password stored in db for verification.
        4. usertype (varchar): Type of user based on role, viz. Issuer, Holder, Verifier.
        5. displayname (varchar): Name to be displayed once logged in. Also used to dermine the sender of credentials and presentations.
        6. schema_id (varchar): Only for issuers. To store on-chain schema_id of the credentials to be issued.
        7. cred_def_id (varchar): Only for issuers. To store a unique identifier for issuer ready to issue credentials.
        8. credntials (varchar): Only for Holders. A list of credentials received in wallet, stored for convinience.

2. Wrapper APIs : This contains the Nestjs backend with Individual APIs for agents, connection, credential-definition, holder, issuance, present-proof, schema. All the APIs are custom made and auto flags are enabled for majority of endpoints, with use of only mandatory variables used keeping the flow easy to understand.

<img src="./assets/System Architecture.jpeg" alt = "System Architecture.jpeg">
Pictorially the architecture can be represented as above.


## How to

### How to Start the Application

### How to issue-hold-present credentials

### How is the application structured

