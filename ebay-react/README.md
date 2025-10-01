# Ebay React (learning project)

Before diving into the project itself of replicating design and functionality of the ebay website in react I looked at a repository [bulletproof react](https://github.com/alan2207/bulletproof-react) because I wanted to follow a different structure than that we saw in class.

Without copying and pasting what the project stablishes as solid guidelines/recommendations for react projects, this is the gist of it:

- Shared → Features → App (one-way flow)
- Shared: reusable, domain-agnostic building blocks (components, hooks, lib, utils, types)
- Features: domain-specific slices (auth, listings, cart, checkout, payments, messaging)
- App: composition layer (routing, providers, app shell)

`Does it make sense to create such a structure for a 'simple' project` -> for me, yes. I understand much better how an app works when everything is modularized and follows an structure. I struggle understanding a library/framework without a point of reference of best/practices and examples, and then after that I am much better at adapting to other structures.
