const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config()

const config = {
    port: process.env.PORT || process.env.DEFAULT_PORT,
    mongoDB: {
        host: process.env.DB_URL_MONGO || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    sessionConfig: {

        store: MongoStore.create({
            mongoUrl: process.env.DB_URL_MONGO,
            mongoOptions: advancedOptions
        }),

        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 600000
        }
    },
    firebase: {
        "type": "service_account",
        "private_key_id": "c6c4913a44caa5ab74afc0d257442a58c5b06d21",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDS9diURQqs1sFG\nwfFlVsY0CTCE5wgWkcEbN/5m/vFfCFqqt2nStTEppcfvN8LsE0RGL+lGWLRIXfpa\nUUUT0if0mVJT+ePgauf0DtpiMp/TewrDd84kBZfIvRxs0RTLkE/FLJJJ9iVbpenE\nne6CoZGTl+4tV09LCqimdPwOVbHQGwhTmkbU+R9JM5WCPcrmKq0kLnXFy5iiH7uW\n80EmvOiaKNggok9u7FrY0msofihw06E1uCYV2/U4f6WNhj2fNm2s3BSd6JG4UaK7\naa8Z/XL4frgSVmZoPHBHsQlon9wUHGW8kGqJ3TaxvtDipHQ4cTk7CwaTOQ3cr9yk\nN6izgp5BAgMBAAECggEACrYHzpNo1Ni8jHqpZoNO4fJ7f6v5SagR3W9s387e83vJ\nmrRgT536hopPyfITWAgsZcHl/rffQ3NeFDrfHoADnlQwjWn5K3pSF56vcN/wJH0x\nUTZihYqxJ7SOXmoJO8KygijerpmsUOhuI5j/NKu+Z/eFVNEDiiRa5sS2zYWFVzMI\ni4TsDYInQaBuVq8PPQms3Cqq6qIA0yAxaN+191UNQ/pbzJQWEeO945V/60P8eGCT\n/KyYoKHfm1aQMS2Ui9DoloYZfGJUlnSPxlN8Z7Dkg6N27hWiA+etMIk15PTrX245\nj/SHPHUtKDmaNrR6+lSwbcZj37hF6J/hu0MffjovvwKBgQDzxRpieFcrGvZOYXKw\n/y4xhDRbEIVA96iG3WDCHQYKHWlQckeIyOyZ58Mf1sYKyESFYM3FrUd70HTPd4+U\nlz0IsqaQkfw0tgJe46HeBPqoFh9sW10y5ZUhnxZYliFvnwD1PFt/VJeTnhtCPAQh\nLD1On2iZXSphxzrDAQTDnCcjHwKBgQDdi1kI1Y7aijNHbVAM2rjJzXtPRRJgWX2W\nvAZfQri1P3+nJvVdXYCsuKMCLCTYRh4QT4ElMJJNOsqro0WAQ4ZsSpdgPBk355A3\n9xKoBhnlRTwhoLIu0H8j3dnIUBqdNQNcBbhFG3eY4/U6YkFB8bl0ekI/Mh9Rk/4X\n5ThMlHBynwKBgGoGy/ASeY+FHaZ/2hvEEfp1jzQgnmTgk0t9lG05pHvXyQu1eQm0\norxaQtNhXigobS06KqYVNSdURspKLYgqs+BJnAr7hCAFHkjZZ3ki30cmwCooHwRZ\nOSEzicukGQzsssT3qLBcQcVyGlcXtZAcJtpAmYVDMYDv384bblAKZjdvAoGBAKP4\n0SsitRq3EwEYvRjmgcKLHWssWk+JrNR10dmLzp4Ho3mZ8hzqaaRs++lNtu+D5hh4\nX8Og0YfrrbmfnH80ezeHdca6dIfWEf36ForaCSySM9FH2NmhY5iuSNRjxW75n8Tq\nTtqHW9uDTSurMVWXjYXSP1n6xQdiG7yf4S186EVNAoGAfCh+XZe6GiI96gjK+gEr\nUAq6GMvcLtNm+vJ/+JDe8tekkVTspxpO2VpqoLKumxngDCaQnspoxU4FJNjR/C9t\noZTdvEKKNAB1xUklbzMVu6JAzCU969TTzUAsKNjh7ZTfZ3qzxIJ/zmZIUwVGGVwn\npyeHQKXO945Mg74bxjAskEw=\n-----END PRIVATE KEY-----\n",
        "client_id": "115037163737931013018",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-guk6p%40backend-coderhouse-krenn.iam.gserviceaccount.com"
    }
}

module.exports = config;