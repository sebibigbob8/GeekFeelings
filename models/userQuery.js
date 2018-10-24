db.createCollection( "users", {
    validator: { $jsonSchema: {
            bsonType: "object",
            properties: {
                name: {
                    bsonType: "string"
                },
                username: {
                    bsonType : "string"
                },
                password: {
                    bsonType : "string"
                },
                gender: {
                    bsonType : "string"
                },
                street: {
                    bsonType : "string"
                },
                streetNumber: {
                    bsonType : "number"
                },
                npa: {
                    bsonType : "number"
                },
                city: {
                    bsonType : "string"
                },
                dateBirth: {
                    bsonType : "date"
                },
                description: {
                    bsonType : "string"
                },
                tag: {
                    bsonType : "string"
                }
            }
        } }
} )