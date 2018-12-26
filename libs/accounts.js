
var fs              = require('fs');
var path            = require('path'); 
var schema          = require('./schema').Schema;
var Promise         = require('promise');
var accounts        = null;

module.exports = class Accounts {

    constructor(intergallactic){
        accounts = intergallactic.account;
    }
    
    accountInfo(address){
        return accounts.getAccount(address)
            .then(data => {
                return data.body.result;
            })
            .catch(err => {
                throw(err)
            })
    }

    loadAccounts(){
        return accounts.listAccounts()
            .then(data => {
                return data.body.result.Accounts;
            })
            .catch(err => {
                throw(err)
            })
    }
    
    getBalance(address){    
        return accounts.getAccount(address)
            .then(data => {
                var result; 
                var response = data.body.result;
                response == null ? result = 0 : result = response.Account.balance;
                return result;
            })
            .catch(err => {
                throw(err);
            });
    }

    getStakes(address){    
        return accounts.getValidator(address)
            .then(data => {
                var result; 
                var response = data.body.result;
                response == null ? result = 0 : result = response.Validator.stake;
                return result;
            })
            .catch(err => {
                throw(err);
            });
    }

    getSequence(address){    
        return accounts.getAccount(address)
            .then(data => {
                var result; 
                var response = data.body.result;
                response == null ? result = 0 : result = response.Account.sequence;
                return result;
            })
            .catch(err => {
                throw(err);
            }); 
    }
        
    getPermissions(address){        
        return accounts.getAccount(address)
            .then(data => {
                var result; 
                var response = data.body.result;
                response == null ? result = "0x0" : result = response.Account.permissions;
                return result;
            })
            .catch(err => {
                throw(err);
            });
    }
    
    getStorageRoot(address){        
        return accounts.getStorage(address)
            .then(data => {
                var result; 
                var response = data.body.result;
                response == null ? result = "0x0" : result = response;
                return result;
            })
            .catch(err => {
                throw(err);
            });
    }

    //TODO : method not yet available
    getCode(address){    
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.Code);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }

    getDefaultAccounts(){
        return new Promise(function (resolve, reject) {
            try{  
                let filePath = path.normalize(__dirname + schema.template + schema.account_list);      
                if (fs.existsSync(filePath)) {
                    let account_list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));                                       
                    resolve(account_list);
                }
                else{
                    throw ('The file does not exist : \n' + filepath);
                }
            }    
            catch(ex){
                reject(ex);   
            } 
        });
    }

}