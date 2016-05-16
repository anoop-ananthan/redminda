angular.module('redminda')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'components/_shared/template/main.html',

                controller: ['$scope', '$state', '$window', 'Contact',
                    function($scope, $state, $window, Contact) {
                        $scope.title = 'Contact';
                        $scope.icon = 'users';
                        get();

                        function get() {
                            Contact.find({
                                filter: {
                                    order: 'firstName asc'
                                }
                            }).$promise.then(function(result) {
                                $scope.dataset = result;
                            });
                        };

                        $scope.save = function() {
                            Contact.upsert($scope.data).$promise.then(function(result) {
                                get();
                            }, function(error) {
                                console.log(error);
                            })
                        };

                        $scope.add = function() {
                            $scope.data = {
                                "fax": "123-345-6789",
                                "email": "test@gmail.com",
                                "firstName": "Rajendra",
                                "lastName": "Prasad",
                                "mobile": "908-907-0051",
                                "phone": "0484-304-294",
                                "salutation": "Mr.",
                                "title": "Project Leader"
                            };
                        };

                        $scope.delete = function() {
                            if ($window.confirm("Are you sure to delete?")) {
                                Contact
                                    .remove($scope.data).$promise.then(function() {
                                        get();
                                    }, function(err) {
                                        $state.go('error', {
                                            err: err
                                        });
                                    })
                            }
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
