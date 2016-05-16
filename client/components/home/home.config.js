angular.module('redminda')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        console.log('> loaded home.config');
        $stateProvider
            .state('home', {
                url: '',
                views: {
                    home: {
                        templateUrl: 'components/home/home.html',
                        controller: ['$scope', '$rootScope', '$state', 'Users',
                            function($scope, $rootScope, $state, Users) {
                                $scope.data = {};
                                $scope.logging = false;
                                $scope.signing = false;

                                $scope.login = function() {
                                    $scope.logging = true;
                                    console.log('> executing login');

                                    if (($scope.data.credentials.match(/@/g) || [])
                                        .length === 1)
                                        $scope.data.email = $scope.data.credentials;
                                    else
                                        $scope.data.username = $scope.data.credentials;

                                    Users
                                        .login($scope.data)
                                        .$promise
                                        .then(function(result) {
                                            console.log(result);
                                            $scope.logging = false;
                                            $scope.data = {};
                                            $state.go('dashboard');
                                        }, function(error) {
                                            console.log(error);
                                            $scope.logging = false;
                                        });
                                };

                                $scope.reset = function() {

                                };

                                $scope.signup = function() {
                                    $scope.signing = true;
                                    console.log('> executing signup');
                                    Users
                                        .create($scope.data)
                                        .$promise
                                        .then(function(result) {
                                            console.log(result);
                                            $scope.data.credentials = $scope.data.email;
                                            $scope.signing = false;
                                        }, function(error) {
                                            console.log(error);
                                            $scope.signing = false;
                                        });
                                };
                            }
                        ]

                    }
                }
            })
    }])
