import dataSource from "./dataSource";

dataSource.initialize()
    .then(() => {
        console.log("Connected to DB Successfully ");
    })
    .catch((err) => {
        console.log("Failed to connect to DB due to this errro :  " + err);
    })

    export  default {dataSource} ;
