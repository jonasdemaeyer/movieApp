'use strict'

angular.module('App', ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
            })
    })
    
    .controller('homeCtrl', ['$scope', function ($scope) {
    	$('#searchButton').on('click', function (e) {

    		var acteur = $('#acteurText').val();
    		if(buildOutput(acteur) == 0){
    		titelSrv.getAllTitelsFromActeur(acteur).then(function(data){
    			var titels = data;
    			saveSrv.setObject(acteur, titels);
    		}else buildOutput(acteur);
    		});
    	});
    	
    }])
	.controller('acteursCtrl', function($scope, acteurSrv){
		$scope.acteurs = acteurSrv.getActeur($scope.acteur);
	})
	.controller('titelsCtrl', ['$scope', '$routeParams', 'acteurSrv', 'titelsSrv', function ($scope, $routeParams, auteurSrv, titelsSrv) {
        $scope.auteur = auteurSrv.getActeur($scope.acteur);
        $scope.titels = titelsSrv.getAllTitelsFromActeur($scope.acteur);
    }])
    
    
	.service('titelSrv', function($http, $q) {
    		this.getAllTitelsFromActeur = function(auteur) {
	    		var q = $q.defer();
	    		var url = 'http://theimdbapi.org/api/find/person?name=q' + encodeURIComponent(films) + '&format=json';

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
	    		
	    		.service('saveSrv', function($window, $http){
	    			  this.setObject = function(key, value){
	    				  $window.localStorage[key] = JSON.stringify(value);
	    				  //Save in CouchDB
	    				  //$http.put('../../' + key, value);
	    			  };
	    			  
	    			  this.getObject = function(key){
	    				  return JSON.parse($window.localStorage[key] || '{}');
	    			  };
	    		});	    		
	    		 
	    		function buildOutput(){
	    			$('#output').html('');
	    			$.ajax({
	    				type: 			'GET'
	    				url: 			'../../' + acteur,
	    				data:			json,
	    				contentType: 	'application/json',
	    				async:			true;
	    				success:		function(data){
	    					var arr = JSON.parse(data);
	    					console.log(arr);
	    					$('#output').html(arr);
	    					
	    				},
	    				error: 	function(XMLHttpRequest, textStatus, errorTrown){
	    					console.los(errorThrown)
	    				}
	    				
	    			});
	    		}