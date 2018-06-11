var app = angular.module('AccountService',[])
    .factory('AccountService',function($http){
        const APIBASE = 'http://outlawdesigns.ddns.net:9661/';
        // const APIBASE = 'http://accounts.attlocal.net/';
        return {
            token:1234,
            handleResponse:function(response){
                return response.data
            },
            handleError:function(err){return err},
            buildAuthHeader:function(){
                return {headers:{'auth_token': this.token}};
            },
            verifyToken:function(){
                var url = APIBASE + 'verify';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            authenticate:function(username,password){
                var url = APIBASE + 'authenticate';
                var config = {headers:{"request_token": username,"password":password}}
                return $http.get(url,config).then(function(response){
                    this.token = response.data.token;
                    return response.data;
                },function(err){
                    return err;
                });
            },
            createUser:function(userObj){
                var url = APIBASE + 'user';
                return $http.post(url,userObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            }
        }
    });