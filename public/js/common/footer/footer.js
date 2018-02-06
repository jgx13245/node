function Footer(container){
	this.container = container;
	this.createDom();
}

Footer.Template=`<div id="new_people">
			
			<div class="ul_list">
				<ul>
					<a href="#javascript:void">购物流程</a>
					<a href="#javascript:void">会员介绍</a>
					<a href="#javascript:void">常见问题</a>
					<a href="#javascript:void">发票说明</a>
					<a href="#javascript:void">联系客服</a>
				</ul>
				<ul>
					<a href="#javascript:void">配送范围及运费</a>
					<a href="#javascript:void">配送进度查询</a>
					<a href="#javascript:void">自提服务</a>
					<a href="#javascript:void">商品验货与签收</a>
				</ul>
				<ul>
					<a href="#javascript:void">货到付款</a>
					<a href="#javascript:void">在线支付</a>
				</ul>
				<ul>
					<a href="#javascript:void">退换货政策</a>
					<a href="#javascript:void">退换货流程</a>
					<a href="#javascript:void">退款说明</a>
				</ul>
				<ul>
					<a href="#javascript:void">优鲜集市</a>
					<a href="#javascript:void">生鲜随心订</a>
					<a href="#javascript:void">精选篮筐</a>
					<a href="#javascript:void">全球购</a>
					<a href="#javascript:void">精品闪购</a>
					<a href="#javascript:void">百联到家</a>
				</ul>
			</div>
		</div>
		<div id="bottom">
			<ul class="ul_1">
				<li>
					<a href="#javascript:void">关于我们</a>
				</li>
				<li>
					<a href="#javascript:void">联系我们</a>
				</li>
				<li>
					<a href="#javascript:void">加盟合作</a>
				</li>
				<li>
					<a href="#javascript:void">诚征英才</a>
				</li>
				<li>
					<a href="#javascript:void">友情链接</a>
				</li>
			</ul>
			</br>
			
		</div>
		</div>
			</div>
`;

$.extend(Footer.prototype,{
  	createDom:function(){
  		this.container.append(Footer.Template);
  	}  

});
	