define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Try to connect with username and password",
    "name": "PostLogin",
    "group": "Login",
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/pictures",
    "title": "Create a picture",
    "name": "CreatePicture",
    "group": "Picture",
    "description": "<p>Registers a new picture.</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>a unique identifier for a picture generated by the server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\n\n{\n    \"user\": \"5bd6drb42rb32a3e8c4e1124\",\n    \"_id\": \"58b2926f5e1def0123e97281\",\n    \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX7Zyc5KveAhUM-qQKHcgVAfEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fw3css_images.asp&psig=AOvVaw06wIo8LrfUiMl1FRy0nCbt&ust=1540907048523156\",\n    \"description\": \"Magnifique ciel !\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /api/pictures HTTP/1.1\nContent-Type: application/json\n\n{\n    \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX7Zyc5KveAhUM-qQKHcgVAfEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fw3css_images.asp&psig=AOvVaw06wIo8LrfUiMl1FRy0nCbt&ust=1540907048523156\",\n    \"description\": \"Magnifique ciel !\",\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "delete",
    "url": "/pictures/:id",
    "title": "Delete a picture",
    "name": "DeletePicture",
    "group": "Picture",
    "description": "<p>Permanently deletes a picture.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /api/pictures/58b2926f5e1def0123e97281 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "get",
    "url": "/pictures/:id",
    "title": "Get a picture",
    "name": "GetPicture",
    "group": "Picture",
    "description": "<p>Get one movie.</p>",
    "examples": [
      {
        "title": "GET /api/pictures/5bd709792832dd1b5c723b43 HTTP/1.1",
        "content": "GET /api/pictures/5bd709792832dd1b5c723b43 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n    \"user\": \"5bd6drb42db32a3e8c4e1124\",\n    \"_id\": \"5bd709792832dd1b5c723b43\",\n    \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEw\",\n    \"description\": \"phot prise en pleine journée\",\n    \"__v\": 0\n},",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "get",
    "url": "/pictures",
    "title": "List pictures",
    "name": "GetPictures",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Get all the movies.</p>",
    "parameter": {
      "fields": {
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "String",
            "optional": true,
            "field": "user",
            "description": "<p>Select only pictures that was uploaded by the person with the specified ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "src",
            "description": "<p>source of the picture</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "description",
            "description": "<p>description of the picture</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "user",
            "description": "<p>user id of the user who uploaded the picture</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK",
          "content": "   HTTP/1.1 200 OK\n   Content-Type: application/json\n\n[\n   {\n       \"user\": \"5bd6drb42db32a3e8c4e1124\",\n       \"_id\": \"5bd709792832dd1b5c723b43\",\n       \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEw\",\n       \"description\": \"phot prise en pleine journée\",\n       \"__v\": 0\n   },\n   {\n       \"user\": \"5bd6drb42rb32a3e8c4e1124\",\n       \"_id\": \"5bd709cd2832dd1b5c723b46\",\n       \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=ra&uact=8&ved=2ahUKEw\",\n       \"description\": \"Vacances chez la famille\",\n       \"__v\": 0\n   }\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "GET /api/pictures?user=5bd6dab42db32a3e8c4e1124 HTTP/1.1",
        "content": "GET /api/pictures?user=5bd6dab42db32a3e8c4e1124 HTTP/1.1",
        "type": "json"
      }
    ],
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "patch",
    "url": "/pictures/:id",
    "title": "Partially update a picture",
    "name": "PartiallyUpdatePicture",
    "group": "Picture",
    "description": "<p>Partially updates a picture's data (only the properties found in the request body will be updated). All properties are optional.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /api/pictures/5bd709cd2832dd1b5c723b46 HTTP/1.1\nContent-Type: application/json\n\n{    \n    \"description\": \"Vacations in Thailand, was awesome !\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n    \"user\": \"5bd6dab42db32a3e8c4e1124\",\n    \"id\": \"5bd709cd2832dd1b5c723b46\",\n    \"src\": \"https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjUtM7HsqveAhUQC-wKHbscDwkQjRx6BAgBEAU&url=https%3A%2F%2Fpixabay.com%2Ffr%2Fimage-statue-laiton-enfant-art-1465348%2F&psig=AOvVaw0ErNhIADV0kxp3uT7cAIFb&ust=1540893717663906\",\n \"description\": \"Vacations in Thailand, was awesome !\",\n \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "post",
    "url": "/api/rdvs",
    "title": "Create a rdv",
    "name": "CreateRdv",
    "group": "Rdv",
    "version": "1.0.0",
    "description": "<p>Registers a new rdv.</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A unique identifier for the movie generated by the server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://evening-meadow-25867.herokuapp.com/api/rdv/58b2926f5e1def0123e97281\n\n{\n  \"city\": \"Yverdon-les-Bains\",\n  \"street\": Avenue des Sports,\n  \"npa\": \"1280\"\n  \"streetNumber\": \"12\"\n  \"purposeTitle\": \"Partie de Magic\"\n  \"description\": \"Cherche un geek chaud à se faire une partie au calme\"\n  \"category\": \"Magic\"\n  \"directorHref\": \"/api/people/58b2926f5e1def0123e97bc0\",\n  \"createdAt\": \"1988-07-12T00:00:00.000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /api/rdvs HTTP/1.1\nContent-Type: application/json\n\n{\n  \"city\": \"Yverdon-les-Bains\",\n  \"street\": \"Avenue des Sports\",\n  \"npa\": \"1280\"\n  \"streetNumber\": \"12\"\n  \"purposeTitle\": \"Partie de Magic\"\n  \"description\": \"Cherche un geek chaud à se faire une partie au calme\"\n  \"category\": \"Magic\"\n}",
        "type": "json"
      }
    ],
    "filename": "routes/rdvs.js",
    "groupTitle": "Rdv"
  },
  {
    "type": "get",
    "url": "/api/movies",
    "title": "List rdvs",
    "name": "RetrieveMovies",
    "group": "Rdv",
    "version": "1.0.0",
    "description": "<p>Retrieves a paginated list of rdvs</p>",
    "parameter": {
      "fields": {
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "String",
            "optional": true,
            "field": "director",
            "description": "<p>Select only movies directed by the person with the specified ID (this parameter can be given multiple times)</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Number",
            "optional": true,
            "field": "rating",
            "description": "<p>Select only movies with the specified rating (exact match)</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Number",
            "optional": true,
            "field": "ratedAtLeast",
            "description": "<p>Select only movies with a rating greater than or equal to the specified rating</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Number",
            "optional": true,
            "field": "ratedAtMost",
            "description": "<p>Select only movies with a rating lesser than or equal to the specified rating</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "GET /api/movies?director=58b2926f5e1def0123e97bc0&page=2&pageSize=50 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nLink: &lt;https://evening-meadow-25867.herokuapp.com/api/movies?page=1&pageSize=50&gt;; rel=\"first prev\"\n\n[\n  {\n    \"id\": \"58b2926f5e1def0123e97281\",\n    \"title\": \"Die Hard\",\n    \"rating\": 7.4,\n    \"directorHref\": \"/api/people/58b2926f5e1def0123e97bc0\",\n    \"createdAt\": \"1988-07-12T00:00:00.000Z\"\n  },\n  {\n    \"id\": \"58b2926f5e1def0123e97282\",\n    \"title\": \"Die Hard With a Vengance\",\n    \"rating\": 8.3,\n    \"directorHref\": \"/api/people/58b2926f5e1def0123e97bc0\",\n    \"createdAt\": \"1995-05-19T00:00:00.000Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rdvs.js",
    "groupTitle": "Rdv"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request all users",
    "name": "GetUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "number",
            "optional": true,
            "field": "ageMin",
            "description": "<p>Select only users older than it.</p>"
          },
          {
            "group": "URL query parameters",
            "type": "number",
            "optional": true,
            "field": "ageMax",
            "description": "<p>Select only users younger than it.</p>"
          }
        ],
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
    "examples": [
      {
        "title": "Example",
        "content": "GET /api/users?pageSize=2 HTTP/1.1",
        "type": "json"
      },
      {
        "title": "Example",
        "content": "GET /api/users/5bd025513b4861db3e592062 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "  HTTP/1.1 200 OK\n  Content-Type: application/json\n{\n   \"page\": 1,\n    \"pageSize\": 1,\n    \"total\": 100,\n    \"data\": [\n        {\n            \"tag\": [],\n            \"_id\": \"5bd025513b4861db3e59205f\",\n            \"name\": \"Gerianne\",\n            \"username\": \"gpengilly2\",\n            \"gender\": \"female\",\n            \"street\": \"Bonner\",\n            \"streetNumber\": \"4\",\n            \"npa\": 9855,\n            \"city\": \"Santa Ignacia\",\n            \"dateBirth\": \"1962-04-10T22:57:50.000Z\",\n            \"description\": \"Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.\"\n        },\n        {\n            \"tag\": [],\n            \"_id\": \"5bd025513b4861db3e592060\",\n            \"name\": \"Brianna\",\n            \"username\": \"bjeeves3\",\n            \"gender\": \"other\",\n            \"street\": \"Hansons\",\n            \"streetNumber\": \"1\",\n            \"npa\": 1879,\n            \"city\": \"Chengxi\",\n            \"dateBirth\": \"1971-09-18T15:23:43.000Z\",\n            \"description\": \"Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.\"\n        }\n    ]}",
          "type": "json"
        },
        {
          "title": "200 OK",
          "content": "  HTTP/1.1 200 OK\n  Content-Type: application/json\n{\n    \"tag\": [],\n    \"_id\": \"5bd025513b4861db3e59205f\",\n    \"name\": \"Gerianne\",\n    \"username\": \"gpengilly2\",\n    \"gender\": \"female\",\n    \"street\": \"Bonner\",\n    \"streetNumber\": \"4\",\n    \"npa\": 9855,\n    \"city\": \"Santa Ignacia\",\n    \"dateBirth\": \"1962-04-10T22:57:50.000Z\",\n    \"description\": \"Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.\"\n}",
          "type": "json"
        }
      ],
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
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
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
    "examples": [
      {
        "title": "200 OK",
        "content": "  HTTP/1.1 200 OK\n  Content-Type: application/json\n{\n    \"tag\": [\"Patinage\",\"pole dance\"],\n    \"name\": \"Niska\",\n    \"username\": \"grigny91\",\n    \"gender\": \"other\",\n    \"street\": \"eqwer\",\n    \"streetNumber\": \"4\",\n    \"npa\": 9855,\n    \"city\": \"Santa monica\",\n    \"dateBirth\": \"1991-04-10T22:57:50.000Z\",\n    \"description\": \"W.L.G\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "201 OK",
          "content": "   HTTP/1.1 201 OK\n   Content-Type: application/json\n{\n    grigny91 Successfully created\n}",
          "type": "json"
        }
      ]
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
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/5bd025513b4861db3e592062 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
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
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/58b2926f5e1def0123e97281 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"description\": \"NEW MICHEAL JACKSON\"\n}",
        "type": "json"
      },
      {
        "title": "Example",
        "content": "GET /api/users/5bd025513b4861db3e592062 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "  HTTP/1.1 200 OK\n  Content-Type: application/json\n{\n    \"tag\": [],\n    \"_id\": \"58b2926f5e1def0123e97281\",\n    \"name\": \"Gerianne\",\n    \"username\": \"gpengilly2\",\n    \"gender\": \"female\",\n    \"street\": \"Bonner\",\n    \"streetNumber\": \"4\",\n    \"npa\": 9855,\n    \"city\": \"Santa Ignacia\",\n    \"dateBirth\": \"1962-04-10T22:57:50.000Z\",\n    \"description\": \"NEW MICHEAL JACKSON\"\n}",
          "type": "json"
        },
        {
          "title": "200 OK",
          "content": "  HTTP/1.1 200 OK\n  Content-Type: application/json\n{\n    \"tag\": [],\n    \"_id\": \"5bd025513b4861db3e59205f\",\n    \"name\": \"Gerianne\",\n    \"username\": \"gpengilly2\",\n    \"gender\": \"female\",\n    \"street\": \"Bonner\",\n    \"streetNumber\": \"4\",\n    \"npa\": 9855,\n    \"city\": \"Santa Ignacia\",\n    \"dateBirth\": \"1962-04-10T22:57:50.000Z\",\n    \"description\": \"Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.\"\n}",
          "type": "json"
        }
      ],
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
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
