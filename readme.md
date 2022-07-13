# GREENER CHALLENGE

This is a repo regarding Greener Challenge!

---

It was required to :

- [x] Create a login page with two fields, email and password. Fields must be validated with the following validations, email must be valid email and password bust be between 3 and 8 characters.

- [x] Create an oboarding flow that has 3 slides with some illustrations and some random text. Every app got one nowadays. This has to be done only for the mobile app.
- [x] Create a home screen that shows the top 10 trending crypto coins available on the market (you can use any GraphQL/REST API).

- [x] Create a coin detail screen, it should include it's name, price, market liquidity and whatever you feel is relevant.

- [ ] It would be great if you can manage to find a solution to implement a cross platform chart component.

---

The goals fallowing enumerated should be discussed and implemented in the next iteration.

- How to perform cross-platform data fetching? (Taking into account server-side (web app/nextjs) and client-side (mobile app) rendering)

- How should we login in a cross-platform app? (Let's assume it's done with Firebase, how would it be implemented to be cross-platform)

- How would you implement a cross-platform http client? (That is, it worked both server-side and client-side)

---

## thoughts,

Firsts thoughts,
First of all, I would remark on the pros of developing a Solito cross-platform app, in my consideration having only one code for all platforms leaves less room for bugs and mistakes and it is time efficient.
Regarding web3 development adds faster auditability for decentralized endpoints. I consider this one the big advantage.
On the other hand, having a lot of dependencies could become a problem in a near future.

I rushed some kind of operational MVP and now have to go for the big questions,

Regarding cross-platform data fetching I think that there are two main options, conditional rendering, for cases that server-side rendering would be beneficial. In this scenario, the isWebMobile hook created by [showtime.xyz](https://github.com/showtime-xyz/showtime-frontend/blob/staging/packages/app/hooks/use-is-mobile-web.ts) could be helpful. In cases where server-side rendering is not needed client-side data fetching could be done.

Regarding cross-platform login I think would be best to force nextJs to do client-side rendering and find a way to store credentials both on web and mobile platforms.

Lastly, I would need more investigation about cross-platform https clients, in this aspect would be needed to switch between server-side responses and client-side ones. Maybe a selector? maybe isolathe the server-side requests? further investigation need to be done.
