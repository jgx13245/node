//开始面向对象变成  头部实例
//定义一个页面级函数
function Page(){
	this.container = $("#wrap")
	this.container_bottom = $("#footer")
}
//浅拷贝
$.extend(Page.prototype,{
	init:function(){
       this.createDom();
       this.craeteAddPosition();
        //创建分页
	   this.createpagination();
       //获取列表内容
	   this.createList();
	  
	  
	},
	createDom:function(){
      this.header =new Header(this.container,'list');
      this.footer = new Footer(this.container_bottom);
	},
	craeteAddPosition:function(){
		var AddModal = $("#positionModal");
		this.position = new AddPosition(AddModal);
	},
	createList:function(){
		var tableList = $("#table-List");
		//吧修改信息的模态框传进去
		var updatemodal=$("#positionModal1")
		this.positionList = new PositionList(tableList,updatemodal);
		//刚才在positionList里面喊了一嗓子，这里同一个对象在这里监听。里面喊了，外面听到了执行这个
		$(this.positionList).on("change",$.proxy(this.handleListChange,this));
	},
	createpagination:function(){
		var pagination = $("#pagination");
		this.pagination = new Pagination(pagination);
		$(this.pagination).on("change",$.proxy(this.handlePageChange,this))
	},
	handleListChange:function(e){
		//这里e是就能带个参数？ render?。。。外面听到了，就让我做事，通知分页对象，数传过来了啊
		this.pagination.render(e.total);
	},
	handlePageChange:function(e){
		//吧分页点击获取的数据给列表穿过去，告诉他我几页，你得变
		this.positionList.changeList(e.num)
	}
	
});

var page = new Page();
page.init();