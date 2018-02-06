//登录页面的对象编程
function Login(container){
	this.container=container;
	this.createDom();
	this.bindEvents();
}

Login.Template=`
<div class="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="loginModalLabel">登录</h4>
					</div>
					<div class="modal-body">

						<form>
							<div class="form-group">
								<label for="loginUser">用户名</label>
								<input type="email" class="form-control" id="loginUser" placeholder="输入用户名">
								
							</div>
							<div class="form-group">
								<label for="loginpassword">密码</label>
								<input type="password" class="form-control" id="loginpassword" placeholder="请输入密码">
							</div>
							
						</form>
						<div class="alert alert-danger hide" id="js-loginError">用户名密码有误</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary"  id="js-loginBtn">登录</button>
					</div>
				</div>
			</div>
		</div>
`;

// $.extend(Login.prototype,{
// 	createDom:function(){
// 		this.container.append(Login.Template);
// 	}
// });
// ------------------------实验版本---------------------------------------
$.extend(Login.prototype,{
	createDom:function(){
 	this.element = $("<div></div>").append(Login.Template);
 	this.registerModalElme = this.element.find("#loginModal");
 	this.successElem = this.element.find("#js-loginSucc");
	this.errorElem = this.element.find("#js-loginError");
	this.container.append(this.element);

	},
	bindEvents:function(){
		var submit = this.element.find("#js-loginBtn");
		submit.on("click",$.proxy(this.subajax,this))
	},
	subajax:function(){
		var name = this.element.find("#loginUser").val();
		var password = this.element.find("#loginpassword").val();
		//ajax数据请求
		$.ajax({
			url:"/api/user/login",
			type:"post",	
			data:{
				name:name,
				password:password
			},
			success:$.proxy(this.ajaxsucc,this),
			error:$.proxy(this.ajaxserr,this),

		})
	},
	ajaxsucc:function(response){
		if(response.ret && response.data.login){
			window.location.reload();
		}else{
			this.errorElem.removeClass("hide");
			setTimeout($.proxy(this.errTimeOut,this),3000);
		}
	},
	succTimeOut:function(){
		this.successElem.addClass('hide');
		}
	



})