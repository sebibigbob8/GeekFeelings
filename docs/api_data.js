define({ "api": [
  {
    "type": "get",
    "url": "/users",
    "title": "Request all users",
    "name": "GetUsers",
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>street of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "streetNumber",
            "description": "<p>street's number of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "npa",
            "description": "<p>npa number of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>date of birth of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tag",
            "description": "<p>table of centers of interests</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new user",
    "name": "createUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>street of the user's adress</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "streetNumber",
            "description": "<p>street's number of the user's adress</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "npa",
            "description": "<p>npa number of the user's adress</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city of the user's adress</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>date of birth of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tag",
            "description": "<p>table of centers of interests</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete an existing user",
    "name": "deleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Request a user's information",
    "name": "updateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>street of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "streetNumber",
            "description": "<p>street's number of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "npa",
            "description": "<p>npa number of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city of the user's adress</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>date of birth of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tag",
            "description": "<p>table of centers of interests</p>"
          }
        ]
      }
    }
  }
] });
