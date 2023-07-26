# premium-pay-backend



---------------------------------------

request :  create super
{
    "fullName":"Test Super admin",
    "phoneNumber":"+998901234567",
    "description":"test uchun"
}


response:

{
    "super_admin": {
        "loginName": "mYSqJeP5Cr",
        "loginPassword": "YeyupR-KNrHAaAM",
        "fullName": "Test Super admin",
        "description": "test uchun",
        "phoneNumber": "+998901234567",
        "role": "super_admin",
        "_id": "64c146157ea59d93311b904b",
        "createdAt": "2023-07-26T16:13:09.488Z",
        "updatedAt": "2023-07-26T16:13:09.488Z",
        "__v": 0
    }
}

--------------------------------------------

request :  login
{
   "loginName": "mYSqJeP5Cr",
    "loginPassword": "YeyupR-KNrHAaAM"
}

response: 

{
    "data": {
        "_id": "64c146157ea59d93311b904b",
        "loginName": "mYSqJeP5Cr",
        "loginPassword": "YeyupR-KNrHAaAM",
        "fullName": "Test Super admin",
        "description": "test uchun",
        "phoneNumber": "+998901234567",
        "role": "super_admin",
        "createdAt": "2023-07-26T16:13:09.488Z",
        "updatedAt": "2023-07-26T16:13:09.488Z",
        "__v": 0
    },
    "message": "Here is your token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGMxNDYxNTdlYTU5ZDkzMzExYjkwNGIiLCJhZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMzIuMyIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTY5MDM4ODA1NSwiZXhwIjoxNjkwNDc0NDU1fQ.b1NKR692E8vvLpcvPNBV2s3Fh3mh5mHlOmNxmuehvcs"
}


-------------------------------------------------------------------------


request : create merchant

{
    "name":"Artel 2",
    "fullName": "Admin 2",
    "phoneNumber":"+998991642834",
    "address":{
        "region":"Toshkent",
        "city":"Chilonzor",
        "homeAddress":"Oq tepa krug"
    },
    "percent": 42,
    "expired_months":[
        3,6,9,12
    ]
}


response : 
 

{
    "message": "Merchant is created successfully",
    "admin": {
        "loginName": "RSr9GWBHpS",
        "loginPassword": "Va5jBozrhIEpQ0Y",
        "fullName": "Admin 2",
        "phoneNumber": "+998991642834",
        "address": {
            "region": "Toshkent",
            "city": "Chilonzor",
            "homeAddress": "Oq tepa krug",
            "_id": "64c148daf040fce0747bfc69"
        },
        "work_status": "working",
        "role": "admin",
        "_id": "64c148daf040fce0747bfc68",
        "createdAt": "2023-07-26T16:24:58.703Z",
        "updatedAt": "2023-07-26T16:24:58.703Z",
        "__v": 0
    },
    "merchant": {
        "who_deleted": null,
        "who_created": "64c146157ea59d93311b904b",
        "admin_id": "64c148daf040fce0747bfc68",
        "name": "Artel 2",
        "type": "Merchant",
        "work_status": "working",
        "percent": 42,
        "expired_months": [
            3,
            6,
            9,
            12
        ],
        "_id": "64c148daf040fce0747bfc6b",
        "who_edited": [],
        "createdAt": "2023-07-26T16:24:58.920Z",
        "updatedAt": "2023-07-26T16:24:58.920Z",
        "__v": 0
    }
}

--------------------------------------------
request : create fillial


{
    "merchant_id":"64c148daf040fce0747bfc6b",
    "name":"Artel fillial 1",
    "address":{
        "region":"Toshkent",
        "city":"Chilonzor",
        "homeAddress":"Oq tepa krug"
    },
    "inn":"12341234"

}


response :

{
    "message": "Fillial is created successfully",
    "fillial": {
        "merchant_id": "64c148daf040fce0747bfc6b",
        "name": "Artel fillial 1",
        "address": {
            "region": "Toshkent",
            "city": "Chilonzor",
            "homeAddress": "Oq tepa krug",
            "_id": "64c14a9344dfb87ed65477eb"
        },
        "work_status": "working",
        "who_deleted": null,
        "who_created": "64c146157ea59d93311b904b",
        "inn": "12341234",
        "_id": "64c14a9344dfb87ed65477ea",
        "createdAt": "2023-07-26T16:32:19.824Z",
        "updatedAt": "2023-07-26T16:32:19.824Z",
        "__v": 0
    }
}


------------------------------------------


request : create user



{
	"merchant_id":"64c148daf040fce0747bfc6b",
	"fillial_id":"64c14a9344dfb87ed65477ea",
	"fullName":"Test user",
	"phoneNumber":"+998970030405",
	"age":23,
        "gender":"Мужской",
	"address":{
        "region":"Toshkent",
        "city":"Chilonzor",
        "homeAddress":"Oq tepa krug",
    }
}


response : 


{
    "message": "user is created successfully",
    "user": {
        "fillial_id": "64c14a9344dfb87ed65477ea",
        "merchant_id": "64c148daf040fce0747bfc6b",
        "loginName": "eUxsCf6g3b",
        "loginPassword": "r-qDft8uEby90Ro",
        "imageUrl": null,
        "fullName": "Test user",
        "phoneNumber": "+998970030405",
        "gender": "Мужской",
        "address": {
            "region": "Toshkent",
            "city": "Chilonzor",
            "homeAddress": "Oq tepa krug",
            "_id": "64c14bf584095b897588949e"
        },
        "age": 23,
        "work_status": "working",
        "who_deleted": null,
        "who_created": "64c146157ea59d93311b904b",
        "role": "user",
        "_id": "64c14bf584095b897588949d",
        "createdAt": "2023-07-26T16:38:13.866Z",
        "updatedAt": "2023-07-26T16:38:13.866Z",
        "__v": 0
    }
}


----------------------------------------



request : upload app

{
    "user_id":"643fea2fba6c173055728895",
    "fullname":"Test fullname",
    "middlename":"Test middlename",
    "canceled_reason":null,
    "status":"finished",
    "expired_month":3,
    "amount":5000000,
    "payment_amount":7000000,
    "products":[
        {
            "name":"iphone 12",
            "price": 5000000
        }
    ],
    "device":{
        "id":"43cuwwp210",
        "name":"A21 s"
    },
    "location":{
        "lat":41.6772,
        "long":69.2201
    }

}


response :
{
    "message": "App is created Successfully",
    "app": {
        "user_id": "643fea2fba6c173055728895",
        "fullname": "Test fullname",
        "middlename": "Test middlename",
        "status": "finished",
        "device": {
            "id": "43cuwwp210",
            "name": "A21 s"
        },
        "location": {
            "lat": 41.6772,
            "long": 69.2201
        },
        "products": [
            {
                "name": "iphone 12",
                "price": 5000000,
                "_id": "64c14f083a796aee622daa5d"
            }
        ],
        "amount": 5000000,
        "payment_amount": 7000000,
        "expired_month": 3,
        "canceled_reason": null,
        "_id": "64c14f083a796aee622daa5c",
        "finished_time": "2023-07-26T21:51:20.110Z",
        "createdAt": "2023-07-26T16:51:20.112Z",
        "updatedAt": "2023-07-26T16:51:20.112Z",
        "__v": 0
    }
}
















