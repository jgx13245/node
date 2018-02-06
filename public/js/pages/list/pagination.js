function Pagination(container){
	this.container = container;
	//执行点击页面切换效果
	this.bindEvents();

}

Pagination.Template=`
	<% for(var i=0;i<count;i++) {%>
		
			<li><a href="javascript:void(1)"><%= i+1%></a></li>
		
	<%}%>

`;

$.extend(Pagination.prototype,{
	render:function(total){
		
		var str = new EJS({
			text:Pagination.Template
		}).render({
			count:total
		})

		this.container.html(str);
	},
	bindEvents:function(){
		this.container.on("click","li",$.proxy(this.handlePageList,this))
	},
	handlePageList:function(e){
		//e.currentTarget（在上方on绑定的时候，写的谁，就指向谁）和e.target（点击时起始的元素）
		var tem = $(e.target);
		var pagenum = parseInt(tem.text(),10);
		//绑定上事件，让外面听着
		$(this).trigger(new $.Event("change",{
				num :pagenum
		}))
	}
});


