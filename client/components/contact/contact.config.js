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
                controller: ['$scope', '$state', 'dataset', function($scope, $state, dataset) {
                    $scope.dataset = dataset;
                }]
            })
            .state('contact.edit', {
                url: '/edit',
                params: {
                    data: null
                },
                views: {
                    '': {},
                    'content': {
                        templateUrl: 'components/contact/contact-form.html',
                        controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                            console.log($scope);
                            $scope.data = $stateParams.data;
                            $scope.save = function() {
                                console.log($scope);
                                Contact.upsert($scope.data).$promise.then(function(result) {
                                    console.log(result)
                                }, function(error) {
                                    console.log(error);
                                })
                            }
                        }]
                    }
                }

            })
            .state('contact.add', {})
            .state('contact.campaign', {})
            .state('contact.campaign.add', {});
    }]);
