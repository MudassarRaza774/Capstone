This project is about an e-commerce website where the user can Signup, LogIn, Logout, Add items, Delete Items, Update items, store items to his/her cart, delete himself and update his profile 

Use these commands to run the backend
1) Go to the backend folder using cd backend
2) Run the backend files using npm start

Now you have a running backend 

Ensure doing these steps to get better experience of backend

1) First you have to signUP
    Goto: localhost:3001/user/signup
    For signUp you are required to give the mandatory inputs which are
    {
    "firstName":"Mudassar",
    "lastName":"Raza",
    "userName":"madmax12", => userName must be unique
    "email":"mudasarraza049@gmail.com", => email must be unique
    "password":"pass_12",
    "phoneNo":22, => phone number must be unique and should not start with '0'
    "address":"Town"
    }
    The password will first hash(using bcrypt) and then store to database
    After successfully signed in you are required to login

2) How to login?
    Goto: localhost:3001/user/login
    You are required to give the mandatory inputs which are
    {
    "email":"mudasarraza049@gmail.com",
    "password":"pass_12"
    }
    After fulfilling the requirements a token will be generate(with JWT) using userID and the token will store in cookie named 'token'

3) Now you are all set to see the items(trousers, shirts etc)
    Goto: localhost:3001/clothes/allVariety
    Note: You have to login first
    Also keep in mind that there is a middleware named as Authenticate.js under Middleware folder which will check rather the user is authentic and authorized to deal with the items

4) Add Items
    Goto: localhost:3001/clothes/addItem
    Note: You have to login first
    For adding any item of your desire, you are required to give the mandatory inputs
    {
    "name":"Shirt8",
    "images":["https://cdn.shopify.com/s/files/1/2290/7887/products/F0228106204_4.jpg?v=1658206996","link2"],
    "price":3000,
    "description":"this is good shirt",
    "size":"XL",
    "stuff":"linen",
    "guidelines":"do not fire it, wash it nicely",
    "catagory":"Shirts",
    "color":"Green"
    }
    By this way you add any item

5) Update Items
    Goto: localhost:3001/clothes/updateItem/631cc659e7a6afc7fee15f59
    Note: You have to login First
    Now you can modify any detail you want 
    {
    "price":3200 => the item price will update to this price
    }

6) Delete Items
    Goto: localhost:3001/clothes/deleteItem/631cc659e7a6afc7fee15f59
    Note: You have to login first
    By just mentioning the Id of the item, you can delete the item

7) Add items to Cart
    Goto: localhost:3001/cart/newItem
    Note: You have to login first
    For adding any item into the cart, you are required to give the mandatory inputs like 
    Which users cart it is and which data you need to store into the cart
    it will look like this
    {
    "userName":"madmax12",
    "productName":"shirt",
    "productPrice":"1200",
    "productImage":"link 1",
    "size":"XL",
    "color":"green"
    }

8) Getting the data of the cart
    Goto: localhost:3001/cart/items/madmax12, where madmax12 is userName which is unique
    Note: You have to login first
    After that you will get all the items that this user added into his/her cart

9) Deleting an item from cart
    Goto: localhost:3001/cart/deleteItem/{id's}
    where id could be single or multiple so that user can delete one item from cart or delete many
    Note: You have to login first

10) Update User
    Goto: localhost:3001/user/update/631cc978e7a6afc7fee15f5d
    Note: You have to login first
    You can Update your profile as you want like
    {
        address:"town2" => update previous town with this town
    }

11) Delete User
    Goto: localhost:3001/user/delete/631c5a0560176b06f5859e4a
    Note: You have to login first
    Note: Only the user which is logged-in can delete himself

12) Logout
    Goto: localhost:3001/user/logout

Note: Keep in mind that the cookie expires in 3 Minutes
