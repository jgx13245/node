function PositionList(elem,upelem){
	this.upelem = upelem;
	this.elem = elem;
	this.tbody = elem.find("tbody");
	this.getDataList();
	this.bindEvents();
	this.picshow = upelem.find(".mm");
	//console.log(this.picshow);
	
}

//转成模板引擎
PositionList.Template=`
	<% for(var i=0;i<list.length;i++) {%>
		<tr>
			<td><%= (i+1)%></td>
			<td><%= list[i].position%></td>
			<td><%= list[i].salary%></td>
			<td><%= list[i].company%></td>
			<td>
			<%if(list[i].logo){%>
			<img width="100" height="100" src="/uploads/<%= list[i].logo%>"/>
			<%} else{%>
				没上传
			<%}%>
			</td>
			<td> <span id="<%= list[i]._id %>" class="js-deleBtn">删除</span>&nbsp;&nbsp;<span name="<%= list[i]._id %>" class="js-update" data-toggle="modal" data-target="#positionModal1">修改</span></td>
		</tr>
	<%}%>

`;


$.extend(PositionList.prototype,{
	bindEvents:function(){
		this.elem.on("click",".js-deleBtn",$.proxy(this.handleDele,this))
		this.elem.on("click",".js-update",$.proxy(this.handleUpdate,this))
		var updateBtn  = this.upelem.find("#updateBtn");
		updateBtn.on("click",$.proxy(this.handleSubmitUpdate,this));
		this.updatelogo = $("#logo1");
		//console.log(this.updatelogo); 
	},

	//--------------提交更新数据----------
	handleSubmitUpdate:function(){
		var formData = new FormData();
		formData.append("id",this.m);
		formData.append("position",this.upelem.find("#position1").val());
		formData.append("salary",this.upelem.find("#salary1").val());
		formData.append("company",this.upelem.find("#company1").val());
		//jqurey加上下标[],就变成原生的
		formData.append("logo",this.updatelogo[0].files[0]);

		console.log(this.updatelogo[0].files[0]);
		$.ajax({
			method:"POST",
			url:"/api/position/updateget",
			data:formData,
			cache:false,
			processData:false,
			contentType:false,
			success:$.proxy(this.handleUpdateGetSucc,this),
			error:$.proxy(this.handleUpdateGetErr,this)
		})
	},
	handleUpdateGetSucc:function(res){
		if(res.ret&&res.data){
			window.location.reload();
		}
	},


	//-------------删除---------------
	handleDele:function(e){
		var del = $(e.target);

		$.ajax({
			url:"/api/position/delete",
			data:{
				id:del.attr("id")
			},
			success:$.proxy(this.handleDeleSucc,this)
		})

	},
	handleDeleSucc:function(res){	
		if(res.ret&& res.data){
			this.changeList();
		}
	},
	//----------更新-（数据库返回数据）---------
	handleUpdate:function(e){
	
		var update =$(e.target);
		//console.log(update);
		$.ajax({
			url:"/api/position/update",
			data:{
				id:update.attr("name"),

			},
			success:$.proxy(this.handleUpdateSucc,this)
		})
	},
	handleUpdateSucc:function(res){
		if(res.ret&&res.data.info){
			this.m  =res.data.info._id;
			 this.n = res.data.info.logo;
			 console.log(this.n);
			this.upelem.find("#position1").val(res.data.info.position);
			this.upelem.find("#salary1").val(res.data.info.salary);
			this.upelem.find("#company1").val(res.data.info.company);
			console.log(this.picshow);
			if(this.n){
				var img = $("<img width='100' height='100' src='/uploads/"+this.n+"'/>")
				this.picshow.html(img);
			}else{
				this.picshow.html("没有上传");
			}
		}
	},

	//-----------获取列表数据发送请求----------
	getDataList:function(page){
		$.ajax({
			url:"/api/position/getList",
			data:{
				page:page || 1,
				count:10
			},
			success:$.proxy(this.handleDataSucc,this)
		})
	},
	handleDataSucc:function(res){
		//自己获取数据后，喊一嗓子，我要变了，谁监听我赶紧准备好做事了
		$(this).trigger(new $.Event("change",{
			total:res.data.total
		}));

		var tem = new EJS({
			text:PositionList.Template
		}).render({
			list:res.data.list
		})


		// var str="";
		// for(var i=0;i<res.data.list.length;i++){
		// 	var item = res.data.list[i];
		// 	str+='<tr><td>'+(i+1)+'</td><td>'+item['position']+'</td><td>'+item['salary']+'</td><td>'+item['company']+'</td><td>'+'删除/修改'+'</td></tr>'
		// }
		this.tbody.html(tem);

	},
	//页面发生改变时候
	changeList:function(page){
		this.nowpage = page;
			$.ajax({
			url:"/api/position/getList",
			data:{
				page:this.nowpage,
				count:10
			},
			success:$.proxy(this.handleChangeListSucc,this)
		})
	},
	handleChangeListSucc:function(res){

		var tem = new EJS({
			text:PositionList.Template
		}).render({
			list:res.data.list
		})

		this.tbody.html(tem);

	}
	

	
})