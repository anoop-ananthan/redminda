angular.module('redminda')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'components/_shared/template/main.html',
                resolve: {
                    dataset: ['Contact', function(Contact) {
                        return Contact.find({
                            filter: {
                                order: 'firstName asc'
                            }
                        });
                    }]
                },
                controller: ['$scope', '$state', 'dataset', 'Contact',
                    function($scope, $state, dataset, Contact) {
                        console.log('> loading dataset');

                        $scope.dataset = dataset;

                        Contact.find({
                            filter: {
                                order: 'firstName asc'
                            }
                        }).$promise.then(function(result) {
                            $scope.dataset = dataset;
                        });

                        $scope.save = function() {
                            Contact.upsert($scope.data).$promise.then(function(result) {
                                console.log(result)
                            }, function(error) {
                                console.log(error);
                            })
                        };

                        $scope.add = function() {
                            $scope.data = {};
                        };

                        $scope.select = function(data) {
                            $scope.data = data;
                        };
                    }
                ]
            })
            .state('contact.form', {
                url: '/form',
                views: {
                    'content@contact': {
                        templateUrl: 'components/contact/contact-form.html'
                    }
                }
            });
    }]);
