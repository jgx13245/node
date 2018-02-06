//开始面向对象变成  头部实例
//定义一个页面级函数
function Page(){
	this.container = $("#wrap")
	this.container_bottom = $("#footer");
}
//浅拷贝
$.extend(Page.prototype,{
	init:function(){
       this.createDom();
	},
	createDom:function(){
      this.header =new Header(this.container);
      this.footer = new Footer(this.container_bottom)
	}
});

var page = new Page();
page.init();