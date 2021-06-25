'use strict';

import redis from 'Redis';

const client = redis.createClient({
    host:"127.0.0.1",
    port:6379,
})

client.on("error", (err) => {
    console.log("[Err] "+ err);
});
client.on("ready", () => {
    console.log("Redis is ready ");
});

const instance = class {
    async set(slackId, token, expireTime){
        try {
            client.set(slackId, token);
            if(expireTime) {
                this.expire(slackId, expireTime);
            }    
        } catch (error) {
            throw(error);
        }
    };

    async get(slackId){
        return new Promise((resolve, reject) => {
            try {
                client.get(slackId, (err, result) => {
                    if(err){
                        reject(null);
                    }
                    resolve(result);
                });
            } catch (error) {
                throw(error)
            }
        });
    };
    
    async expire(slackId, expireTime) {
        try {
            client.expire(slackId, expireTime);
        } catch (error) {
            throw(error)
        }
    }

    async exists(slackId){
        return new Promise((resolve, reject) => {
            client.exists(slackId, (err, result) => {
                if(err){
                    reject(resolve);
                }
                const isExists = result == "1"? true:false;
                resolve(isExists);
            });
        });
    };

    async delete(key) {
        try {
            client.del(key);
        } catch (error) {
            throw(error)
        }
    }

    async rename(originKey, rename) {
        client.rename(originKey, rename);
    }

    async keys(keys) {
        // The * pattern returns an array of all keys
        return new Promise((resolve, reject)=>{
            client.keys(keys, function (err, arrayOfKeys) {
                const keysArr = [];
                arrayOfKeys.forEach( function (key) {
                    keysArr.push(key);
                });
                resolve(arrayOfKeys);
            });
        })

    }

    flushall(){
        client.flushall( function (didSucceed) {
        });
    }
}

export default new instance();