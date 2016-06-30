/**
 * Title: image viewer
 * Author: Z.Ch.
 * Version: 1.0.7.16
 */

require.config({
	baseUrl:'/scripts/',
	paths:{
		zepto:'lib/zepto',
		underscore:'lib/underscore.min',
		json:'plugins/require/json',
		text:'plugins/require/text',
		util:'util/util'
	},
	shim:{
		zepto:{
			exports:'$'
		},
		underscore:{
			exports:'_'
		}
	}
});

require(["zepto", "underscore", "util"], function($, _, util) {
	util.log.I("Works well!");
	var prj = "imageviewer";
	var paths = {
		text: "text!../"+prj+"/text/main.html",
		data: "json!../"+prj+"/data/mock.json",
		image: "text!../"+prj+"/text/image.html",
		swiper: "../"+prj+"/js/swipeImage"
	}
	require([paths.text, paths.data], function(text, data) {
		util.fillAll(data.title, 'title');
		var html = util.render(data, text);
		util.fillAll(html, 'body');

		var imgList = data.imgList;
		util.lazyload($('.pic img'));

		$('.pic').on('tap', function(event) {
			var idx = $(this).data('idx')*1;
			util.log.M(idx, "点击图片ID");
			// fullImage(idx, 3);
			require([paths.image, paths.swiper], function(tpl, swiper) {
				util.log.D(swiper, "swiper");
				swiper.init(tpl, imgList, idx, 3);
			});
		});

		

		/** 大图模式，第二个参数表示向后预加载图片数量 */
		/*function fullImage(idx, count) {
			if(!count || count < 1) count = 5;
			var curPage = idx,
				length = imgList.length,
				startIdx = idx-(count-1)>0 ? idx-(count-1) : 0,
				endIdx = idx+(count+1)<length ? idx+(count+1) : length;
			require([paths.oneImage], function(oneImage) {
				var fullData = {
					fullList: [],
					title: "",
					page: "",
					length: length
				}
				fullData.fullList = imgList.slice(startIdx, endIdx);
				fullData.title = imgList[idx].title;
				fullData.page = idx+1;
				util.log.M(fullData.fullList);
				var fullImageHtml = util.render(fullData, oneImage);
				$('.img_list').hide();
				util.fill(fullImageHtml, 'body');

				// checkPage(curPage, count, $('.img_full ul'));
				// swipeImage($('.img_full ul'));
			});
		}*/

		// function checkPage(curPage, count, ul) {
		// 	var liNodes = ul.find('li');
		// 	var liWidth = window.innerWidth,
		// 		liLen = liNodes.length;
		// 	if(curPage + count < liLen && curPage -) {}
		// }

		// function swipeImage(ul) {
		// 	util.log.I(window.innerWidth, "innerWidth");
		// 	util.log.M(ul, 'ul');
		// 	var liNodes = ul.find('li');
		// 	var liWidth = window.innerWidth,
		// 		liLen = liNodes.length;
		// 	liNodes.css({width: liWidth + 'px'});
		// 	ul.css({width: liWidth*liLen + 'px'});

		// 	var poingX, pointY;

		// 	ul.on('touchstart', function(event) {
		// 		if(event.touches.length==1 && !self.busy){
		// 			poingX = e.touches[0].screenX;
		// 			pointY = e.touches[0].screenY;
		// 		}
		// 	}).on('touchmove',function(event){
		// 		if(e.touches.length==1 && !self.busy){
		// 		    return self.move(e.touches[0].screenX,e.touches[0].screenY);//这里根据返回值觉得是否阻止默认touch事件
		// 		}
		// 	}).on('touchend',function(event){
		// 		!self.busy && self.move_end();
		// 	});
		// }

	});
});