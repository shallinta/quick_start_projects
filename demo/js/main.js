/**
 * Title: Quick start demo page
 * Author: Z.Ch.
 * Version: 1.0.7.16
 */

require.config({
	baseUrl:'./../scripts/',
	paths:{
		zepto:'./lib/zepto.min',
		underscore:'./lib/underscore.min',
		json:'./plugins/require/json',
		text:'./plugins/require/text',
		util:'./util/util'
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
	require(["text!./../../demo/text/main.html", "json!./../../demo/data/mock.json"], function(text, data) {
		util.fillAll(data.title, 'title');
		var html = util.render(data, text);
		util.fillAll(html, 'body');

		var a = 'aaad g bbb c abc dgf ab c 3d gsd c a bc 4a b c';
		var b = ['abc', 'dg'];
		function regMatch (a, b) {
			var sep = '\\s*';
			var len = b.length;
			var result = [];
			while (len--) {
				var str = b[len];
				var reg = new RegExp(str.split('').join(sep), 'g');
				result.push(a.match(reg));
			}
			return result.reverse();
		}
		console.log(regMatch(a, b));

	});
});