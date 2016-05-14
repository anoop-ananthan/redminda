angular.module('redminda')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        console.log('> loaded home.config');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    home: {
                        templateUrl: 'components/home/home.html',
                        controller: ['$scope', '$state', 'Users', function($scope, $state, Users) {
                            $scope.data = {};
                            $scope.spinning = false;

                            $scope.login = function() {
                                $scope.spinning = true;
                                Users
                                    .login($scope.data)
                                    .$promise
                                    .then(function(result) {
                                        console.log(result);
                                        $scope.spinning = false;
                                        $scope.data = {};
                                        $state.go('dashboard');
                                    }, function(error) {
                                        console.log(error);
                                        $scope.spinning = false;
                                    });

                            };

                            $scope.reset = function() {

                            };

                            $scope.signup = function() {
                                $scope.spinning = true;
                                console.log('> executing signup');
                                Users
                                    .create($scope.data)
                                    .$promise
                                    .then(function(result) {
                                        console.log(result);
                                        $scope.spinning = false;
                                        $scope.data = {};
                                        $state.go('dashboard');
                                    }, function(error) {
                                        console.log(error);
                                        $scope.spinning = false;
                                    });
                            };
                        }]
                    }
                }
            })
    }])
