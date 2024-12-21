const { test, expect }  = require("playwright/test");
const { log } = require("console");
const { Ajv } = require("ajv");

const ajv = new Ajv

//test1 API GET
test('GET Request', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/2'); 
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.data.id).toBe(2)
    expect(responseData.data.email).toBe("janet.weaver@reqres.in")
    
    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)

    if (!valid) {
        console.error("AJV Validation Errors: ", ajv.errorsText());
    }

    expect(valid).toBe(true);

});


//test2 API POST
test('POST Request', async ({request}) => {

    const bodyData = {
            "name": "Rafael Djaya Seputra",
            "job": "Staff"
    }
    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.post('https://reqres.in/api/users', {
        data: bodyData,
        headers: headerData
        
    })
    
    expect(response.status()).toBe(201)

    const responseData = await response.json()

    expect(responseData.name).toBe("Rafael Djaya Seputra")

    const valid = ajv.validate(require('./jsonschema/post-object-schema.json'), responseData)

    if (!valid) {
        console.error("AJV Validation Errors: ", ajv.errorsText());
    }

    expect(valid).toBe(true);

});


//test3 API DELETE
test('DELETE Request', async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    
    expect(response.status()).toBe(204)

});


//test4 API PUT
test('PUT Request ', async ({request}) => {
    const bodyData = {
        "name": "Rafael Djaya Seputra",
        "job": "Staff"
    }
    const headerData = {
    Accept: 'application/json'
    }

    const response = await request.put('https://reqres.in/api/users/2', {
    data: bodyData,
    headers: headerData
    
    })

    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.name).toBe("Rafael Djaya Seputra")

    const valid = ajv.validate(require('./jsonschema/put-object-schema.json'), responseData)

    if (!valid) {
        console.error("AJV Validation Errors: ", ajv.errorsText());
    }

    expect(valid).toBe(true);
});