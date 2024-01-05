# Nuxt 3 MySQL issue tracker app test

A simple issue tracker inspired by https://github.com/mosh-hamedani/issue-tracker/tree/main originally made in Next.js.

This app uses auth.js for credential authentication. For Images, MinIo is used as an object storage layer for both user and issue images. For markdown support in description, 'marked' dependency is used on client side.

use 'docker-compose' file to start the MySQL and MinIo server, after that set the access for the minio bucket to public, then start the nuxt server to create an user.

for api testing , use the test directory by importing the collection to postman, set AUTH_BYPASS to true in '.env' file to check the apis in postman.

## screenshots

signup page
![Alt text](<screenshots/signup page.png>)

login page
![Alt text](<screenshots/login page.png>)

issues list
![Alt text](<screenshots/issues list.png>)

create issue
![Alt text](<screenshots/create issue.png>)

update issue
![Alt text](<screenshots/update issue.png>)

users list
![Alt text](<screenshots/users list.png>)
