/**
 * Title: personal defined common functions libary
 * Author: Z.Ch.
 * Version: 1.1.3.18
 */

define(["zepto", "underscore"], function($, _) {

	var logI = "color:#0f0;";
	var logD = "color:#f33;";
	var logM = "color:#33f;";
	var logE = "color:#f90;";

	/** 控制台打印内部使用方法，第一个参数是打印的内容，必须。 */
	var log = function(info, prefix, v, css, type) {
		v = v && "【"+prefix+"-\""+v+"\"】 如下：" || "【"+prefix+"】 如下：";
		console.log("%c"+v, css);
		type = !!type && type || "log";
		if(typeof info == "object" || typeof info == "function") {
			console[type](info);
		} else {
			console[type]("%c"+info, css);
		}
		console.log("");
	}

	/** 修改underscore模板的表达方式 */
	_.templateSettings = {
		evaluate    : /\{=(.+?)=\}/g,
		interpolate : /\{\{(.+?)\}\}/g
	};

	return {
		/** 控制台打印 */
		log: {
			/** 打印一般信息 绿色 */
			I: function(info, v) {
				log(info, "信息", v, logI);
			},
			/** 打印调试信息 红色 */
			D: function(debug, v) {
				log(debug, "调试", v, logD, "error");
			},
			/** 打印监视变量 蓝色 */
			M: function(monitor, v) {
				log(monitor, "监视", v, logM, "info");
			},
			/** 打印边界信息（主要用于边界的监视变量） 橙色 */
			E: function(edge, v) {
				log(edge, "边界", v, logE, "warn");
			}
		},
		/** 向node元素填充html片段 （追加） node元素为$选择器字符串 */
		fill: function(html, node) {
			$(node).append(html);
		},
		/** 向node元素填充html片段 （覆盖） node元素为$选择器字符串 */
		fillAll: function(html, node) {
			$(node).html(html);
		},
		/** 向html渲染数据 */
		render: function(data, html) {
			var template = _.template(html);
			// log(template(data), '调试', "", logD);
			return template(data);
		},
		/** 获取日期时间 */
		dateTime: function() {
			var currentDate = new Date();
			var year = currentDate.getFullYear();
			var month = currentDate.getMonth()+1;
			var date = currentDate.getDate();
			var day = currentDate.getDay();
			var hour = currentDate.getHours();
			var minute = currentDate.getMinutes();
			var second = currentDate.getSeconds();
			var days = ["日", "一", "二", "三", "四", "五", "六"];
			month = month>9?month.toString():'0'+month;
			date = date>9?date.toString():'0'+date;
			hour = hour>9?hour.toString():'0'+hour;
			minute = minute>9?minute.toString():'0'+minute;
			second = second>9?second.toString():'0'+second;
			return {
				year: year,
				month: month,
				date: date,
				day: '星期'+days[day],
				hour: hour,
				minute: minute,
				second: second,
				millsecond: currentDate.getTime(),
				fulldate: year+'年'+month+'月'+date+'日',
				fulltime: hour+':'+minute+':'+second,
				datetime: currentDate.toLocaleString(),
				dateNo: year.toString().substring(2, 4)+month+date
			};
		},
		/**
		 * 封装通用定时器
		 * @param  {Function}   foo    【必选】定时器要定时执行的主要函数
		 * @param  {integer}   loop    【必选】整数，间隔执行的毫秒数
		 * @param  {任意类型}   args   【可选】可选的任意类型参数，传递以供定时器主函数foo和回调函数callback中使用
		 * @param  {Function} callback 【可选】可选的回调函数，在定时器end之后执行
		 * @return {object timer}       返回封装好的定时器实例，包含start和end两个方法，用于开始定时器和停止定时器
		 * 说明：后两个可选参数可任选一个，同时使用时也不必注意前后顺序
		 */
		timer: function(foo, loop, args, callback) {
			loop = _.isNumber(loop) && !_.isNaN(loop) && loop || 1000;
			var temp = callback;
			callback = _.isFunction(args) && args || (!!callback && callback || undefined);
			args = !_.isFunction(args) && args || (!_.isFunction(temp) && !!temp && temp || {});
			var timer = {};
			return {
				start: function() {
					timer = setInterval(function() {foo(args);}, loop);
				},
				end: function() {
					clearInterval(timer);
					callback && callback(args);
				}
			};
		},
		/** 图片惰性加载 */
		lazyload: function(arr) {
			var picList = arr;
			var winUp, winDown;
			
			$(window).on('scrollStop resize load loadPic', function () {
				winUp = window.pageYOffset;
				winDown = window.pageYOffset + window.innerHeight;
				//IE7-10 不支持scrollY属性
            	//IE9-10 支持pageYOffset属性
				start(picList);
      });
      $(window).trigger('loadPic');

			function start(picList) {
				$.each(picList, function(idx, el) {
					if(check($(el))) {
						load($(el));
					}
				});
			}

			function check(pic) {
				var offset = pic.offset();
				return offset.top + offset.height > winUp && offset.top < winDown;
			}

			function load(pic) {
				var newPic = $('<img style="display:none" />');
				newPic.on('load', function() {
					pic.replaceWith(newPic);
					newPic.fadeIn();
					newPic.off('load');
				});
				newPic.attr('src', pic.attr('lazy_src'));
			}
		}
	};
});