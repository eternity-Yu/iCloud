var reminder=angular.module('reminder',[]);

reminder.filter('search',[function(){
	return function(e,key){
		var f=function(items){
			for(var i=0;i<items.length;i++){
				if(items[i].title.indexOf(key)!=-1){
					return true;
				}
			}
			return false;
		}
		var r=[];
		for(var i=0;i<e.length;i++){
			if(e[i].name.indexOf(key)!=-1){
				r.push(e[i]);
			}
			else if(f(e[i].items)){
				var re=[];
				var newarr=deepCopy(e[i].items);
				for(var j=0;j<newarr.length;j++){
					if(newarr[j].name.indexOf(key)!=-1){
						re.push(newarr[j]);
					}
				}
				e[i].items=re;
				r.push(e[i]);
			}
		}
		return r;
	}
}])


reminder.controller('rdCtrl', ['$scope', function($scope){
	var d=localStorage.data;
	$scope.shijianliebiao=d?JSON.parse(d):[];
	//$scope.shijianliebiao=[];
	$scope.clistindex=0;
	$scope.colors=['orange','purple','green','blue','yellow','brown','pink'];
	//$scope.copy=angular.copy($scope.shijianliebiao)
	$scope.countDone=function(){
		var lis=$scope.shijianliebiao[$scope.clistindex].items;
		var r=0;
		for(var i=0;i<lis.length;i++){
			if(lis[i].isDone){
				r+=1;
			}
		}
		return r;
	}
	$scope.addshijian=function(){
		var data={
			name:'新列表'+($scope.shijianliebiao.length+1),
			color:$scope.colors[$scope.shijianliebiao.length%7],
			items:[]
		};
		$scope.shijianliebiao.push(data);
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.setItem=function(index){
		$scope.clistindex=index;
		$scope.key=null;
	}
	$scope.deleteItem=function(){
		var r=[];
		for(var i=0;i<$scope.shijianliebiao.length;i++){
			if(i!=$scope.clistindex){
				r.push($scope.shijianliebiao[i]);
			}
		}
		$scope.shijianliebiao=r;
		$scope.clistindex=0;
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.save=function(){
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.addItems=function(){
		var data={
			title:'新条目'+($scope.shijianliebiao[$scope.clistindex].items.length+1),
			isDone:false
		};
		$scope.shijianliebiao[$scope.clistindex].items.push(data);
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.deleteTodo=function(index){
		var r=[];
		var cu=$scope.shijianliebiao[$scope.clistindex];
		for(var i=0;i<cu.items.length;i++){
			if(i!=index){
				r.push(cu.items[i]);
			}
		}
		$scope.shijianliebiao[$scope.clistindex].items=r;
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
}]);
