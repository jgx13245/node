//头部对象部分
function Header(container,page) {
	this.page = page || 'index';
	this.container = container;
	this.createDom();
	this.createregister();
	this.createlogin();
	this.loginStatus();
	this.bindEvents();
};

Header.Template=`
<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        		<span class="icon-bar"></span>
	        		<span class="icon-bar"></span>
	        		<span class="icon-bar"></span>
	      		</button>
				<a class="navbar-brand" href="#">成绩管理系统</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
	        		<li <% if(page=='index') {%> class="active" <% } %>>
	        			<a href="/">首页</a>
	        		</li>
	        		<li  <% if(page=='list') {%> class="active" <% } %>>
	        			<a href="/list.html">列表页</a>
	        		</li>
	      		</ul>
	      		<ul class="nav navbar-nav navbar-right" id="unLoginin">
	        		<li data-toggle="modal" data-target="#registerModal">
	        			<a href="#">注册</a>
	        		</li>
	        		<li data-toggle="modal" data-target="#loginModal">
	        			<a href="#">登陆</a>
	        		</li>
	      		</ul>

	      		<ul class="nav navbar-nav navbar-right" id="isLogin">
	      			<li>
	        			<a href="#" id="js-loginUserName"></a>
	        		</li>
	        		<li id="loginOut">
	        			<a href="#">退出</a>
	        		</li>
	      		</ul>
	    	</div>
	  </div>
	</nav>

`;

$.extend(Header.prototype,{
	createDom:function(){

		var html  = new EJS({text:Header.Template}).render({
			page:this.page,
		})
		//把自己填进去
		this.element= $("<div></div>").append(html);
		this.container.append(this.element);
		this.unLogin = $("#unLoginin");
		this.isLogin = $("#isLogin");
		this.loginOut= $("#loginOut");
		this.loginUserName = $("#js-loginUserName")
	},

	createregister:function(){
        this.register = new Register(this.container);
	},
	createlogin:function(){
      this.login= new Login(this.container); 
	},
	loginStatus:function(){
	 $.ajax({
	 	url:"/api/user/isLogin",
	 	type:"get",
	 	success:$.proxy(this.handleloginsucc,this)
	 })
	},
	handleloginsucc:function(res){
		if(res.ret && res.data.login){
			this.loginUserName.text("尊敬的用户："+res.data.username);
			this.unLogin.addClass("hide");
			this.isLogin.removeClass("hide");
			
		}
	},
	bindEvents:function(){
	 	this.loginOut.on("click",$.proxy(this.handleLoginOut,this));
	 },
	handleLoginOut:function(){
		$.ajax({
			url:"/api/user/loginOut",
			success:$.proxy(this.handleSucc,this)
		})
	},

	handleSucc:function(res){
		if(res.ret && res.data.login){
			window.location.reload();
		}
	}

});