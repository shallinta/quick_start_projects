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
	require(["text!./../../test/text/main.html", "json!./../../test/data/mock.json"], function(text, data) {
		util.fillAll(data.title, 'title');
		var html = util.render(data, text);
		util.fillAll(html, 'body');

		var ul = $('.slider');
		var width = 0;
		_.each(ul.find('li'), function(li) {
			util.log.I($(li).width());
			width += $(li).width();
		});

		util.log.M(width);



	});
});