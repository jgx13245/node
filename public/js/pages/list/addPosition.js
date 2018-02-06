//没多写一个对象页面，记得要在html页面里面引用,否则该页面就找不着了。
function AddPosition(elem){
	this.elem = elem;
	this.position = elem.find("#position");
	this.salary = elem.find("#salary");
	this.company = elem.find("#company");
	this.logo  = elem.find("#logo");

	//进行一个绑定事件
	this.btnEvents();
}
$.extend(AddPosition.prototype,{
	btnEvents:function(){
		//获取输入以后的点击按钮事件
		var submitBtn = this.elem.find("#submitBtn");
		//获取成功，进行事件绑定
		submitBtn.on("click",$.proxy(this.handlesubmitBtnclick,this));
	},
	handlesubmitBtnclick:function(){
		var formData = new FormData();
		formData.append("position",this.position.val());
		formData.append("salary",this.salary.val());
		formData.append("company",this.company.val());
		//jqurey加上下标[],就变成原生的
		formData.append("logo",this.logo[0].files[0]);
		console.log(formData);

		$.ajax({
			method:"post",
			url:"api/position/add",
			cache:false,
			processData:false,
			contentType:false,
			data:formData,
			success:$.proxy(this.handlesucc,this),
			error:$.proxy(this.handleerror,this)
		})
	},
	handlesucc:function(res){
		if(res.ret&&res.data){
			window.location.reload();
		}else{
			this.handleerror();
		}
	},
	handleerror:function(){
		alert("添加失败，稍后重试")
	}

})