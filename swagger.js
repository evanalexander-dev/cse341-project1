const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts API'
    },
    host: 'cse341-project1-8sfe.onrender.com',
    schemes: ['https'],
    components: {
        schemas: {
            Contact: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "681a954e208706a4867f8ef9" },
                    firstName: { type: "string", example: "John" },
                    lastName: { type: "string", example: "Doe" },
                    email: { type: "string", example: "johndoe@example.org" },
                    favoriteColor: { type: "string", example: "Blue" },
                    birthday: { type: "string", example: "January 1" }
                }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);