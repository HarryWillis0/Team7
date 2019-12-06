# Team7
JavaScript, HTML, and CSS project for OOSD


## Dependencies:

- bcryptjs: 2.4.3
- express-session: 1.17.0
- jquery: 3.4.1
- moment: 2.24.0
- mysql: 2.17.1
- pug: 2.0.4

## Known Bugs
- There is no validation on the booking a package form
  - if a user happens to book with empty fields the app crashes. This is because the code is trying to enter empty values into required fields of the database. This can be fixed easily with a validation script, but for the purposes of the project (being a prototype) we didn't add this functionality
