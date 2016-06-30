/**
 * swipeImage
 * 7.21
 */

define(["zepto", "underscore", "util"], function($, _, util) {
	
	var imgList = [],
		len = 0,
		count = 0,
		pageLen = 0,
		curPage = 0,
		startPage = 0,
		endPage = 0,
		template = "";
	function showImage() {
		var data = {
			list: [],
			title: "",
			page: "",
			length: len
		}
		data.list = imgList.slice(startPage, endPage);
		data.title = imgList[curPage].title;
		data.page = curPage+1;
		util.log.M(data.list, "获取的数组");
		var html = util.render(data, template);
		$('.img_list').hide();
		util.fill(html, 'body');
	}
	function checkPage() {
		util.log.I(window.innerWidth, "innerWidth");
		var ul = $('.img_full ul');
		util.log.M(ul, 'ul');
		var liNodes = ul.find('li');
		var liWidth = window.innerWidth,
			liLen = liNodes.length;
		liNodes.css({width: liWidth + 'px'});
		ul.css({
			width: liWidth*liLen + 'px',
			marginLeft: -1*liWidth*curPage
		});
	}
	function swipeImage() {
		var ul = $('.img_full ul');
		var poingX, flag;

		ul.on('touchstart', function(event) {
			if(event.touches.length==1){
				poingX = event.touches[0].screenX;
			}
		}).on('touchmove',function(event){
			if(event.touches.length==1){
			    var x = event.touches[0].screenX; 
				var deltaX = x - (!!poingX&&pointX||x);

			}
		}).on('touchend',function(event){
			!self.busy && self.move_end();
		});
	}
	function move(x, y) {
		var deltaX = x - (this.point_x===null?point_x:this.point_x),
			deltaY = y - (this.point_y===null?point_y:this.point_y),
			marginleft = this.now_left, return_value = false,
			sin =changeY/Math.sqrt(changeX*changeX+changeY*changeY);
		this.now_left = marginleft+changeX;
		this.move_left = changeX<0;
		if(sin>Math.sin(Math.PI/3) || sin<-Math.sin(Math.PI/3)){//滑动屏幕角度范围：PI/3  -- 2PI/3
		    return_value = true;//不阻止默认行为
		}
		this.point_x = point_x;
		this.point_y = point_y;
		this.box.css(this.get_style(2));
		return return_value;
	}

	return {
		init: function(tpl, imageList, idx, cnt) {
			template = tpl;
			imgList = imageList;
			len = imgList.length;
			curPage = idx;
			count = cnt&&cnt>0&&cnt<=len/2 ? cnt : Math.floor(len/2);
			startPage = curPage-(count-1)>0 ? curPage-(count-1) : 0,
			endPage = curPage+(count+1)<len ? curPage+(count+1) : len;
			pageLen = endPage - startPage;

			showImage();
			checkPage();
			// swipeImage();
		},
		loadImage: function() {
			checkPage();
		},
		monitor: function() {
			return {
				imgList: imgList,
				len: len,
				count: count,
				pageLen: pageLen,
				curPage: curPage,
				startPage: startPage,
				endPage: endPage,
				template: template
			}
		}
	};
});