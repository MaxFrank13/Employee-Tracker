# Employee-Tracker

## Description

Command line application for viewing and managing departments, roles, and employees in a company. This app utilizes Inquirier, MySQL, and the console.table package to prompt the user, save their inputs, and provide the option to display various tables.

[Video demonstration](https://drive.google.com/file/d/1bAwvf2NWgxplhnc29STods0VCb7sEXVX/view)

## Installation & Usage

Run `npm i` or `npm install` to install the necessary dependencies. You will also need to connect to MySQL using your corresponding name and password (WARNING: don't use a password that you have for other projects. The app in its current state will display that information to anyone who has access to the file. Which, if it's on your GitHub, means pretty much everyone will see it). 

## How it Works

By storing all of the data in MySQL we are able to utilize its persistent storage as a way to update our team's information and have access to it later. Inquirer is running prompts for user to extract information and save it to the MySQL database.
