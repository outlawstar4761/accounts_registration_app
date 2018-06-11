var app = angular.module('Registration',['ngRoute','AccountService'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'views/error.html'})
            .when('/:auth_token',{templateUrl:'views/register.html'})
            .otherwise({redirectTo:'/'})
    }])
    .controller('registrationController',function(AccountService,$routeParams,$location){
        var self = this;
        self.newUser = {};
        self.auth_token = $routeParams.auth_token;
        AccountService.token = self.auth_token;
        self.verifyToken = function(){
            AccountService.verifyToken().then(function(data){
                if(data.error){
                    $location.path('/');
                }
            });
        };
        self.register = function(){
            console.log(self.newUser);
            AccountService.createUser(self.newUser).then(function(data){
                if(data.error){
                    console.log(data);
                }else{
                    console.log(data);
                }
            });
        };
        self.verifyToken();
    });