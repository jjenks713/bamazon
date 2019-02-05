# Bamazon Storefront
___
## Simple command line app with 2 functions

Customer | Manager
------------ | -------------
This allows you to purchase items from the bamazon databse | Manager view allows you to add items, update inventory and view inventory
![customer](https://user-images.githubusercontent.com/43326100/52311018-b7e0af00-2962-11e9-8388-98038f29eba0.JPG) | ![manager](https://user-images.githubusercontent.com/43326100/52311022-c038ea00-2962-11e9-8b08-7827804f0f67.JPG)

___

## Setup
To run this application, you will need [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html) and [Node JS](https://nodejs.org/en/download/) installed on your computer.

#### MySQL Database Setup
If you do not have MySQL database already set up on your machine, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in [bamazon.sql](bamazon.sql). Run this code inside your MySQL client (like [Sequel Pro](https://www.sequelpro.com/) or [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)). To populate the database import the info.csv file into the products table, then you will be ready to proceed with running the Bamazon customer and manager interfaces.
___

## Run Application
Once you have the Bamazon database set up, run these commands in the command line:

```
git clone https://github.com/jjenks713/bamazon.git
npm install
node bamazon.js (customer command)
```
Note: type `node bamazon-manager.js` to access the manager portal
___

## Run Video
Here is a [video](https://drive.google.com/file/d/16x_8Qol4uBEC-RJ8EGpaWdIDOC9vdcju/view) to show how the application works. Enjoy!

___

## Contributors
[Josh Jenkin](https://github.com/jjenks713)
