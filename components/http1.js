(function(document,window,undefined){
	
	var jsonp=function(url,data,callback){ 
			
		var cbFuncName='my_json_cb_'+Math.random().toString().replace('.',''); 
		window[cbFuncName]=callback;
		//1，处理url中的回调参数
		//2，创建一个script标签
		//3，挂载回调函数
		//4，将script标签放到页面中
		var querystring=url.indexOf('?')==-1?'?':'&';
		for(var key in data){
			querystring+=key+'='+data[key]+'&';
		}
		querystring+='callback='+cbFuncName;
		var scriptElem=document.createElement('script');
		scriptElem.src=url+querystring;
		
		document.body.appendChild(scriptElem);
	}
	window.$jsonp=jsonp;

})(document,window);


		
		

	

