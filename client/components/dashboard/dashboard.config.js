angular.module('redminda')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'components/dashboard/dashboard.html',
                controller: ['$scope', '$state', 'Dashboard', function($scope, $state, Dashboard) {

                }]
            })
    }])
