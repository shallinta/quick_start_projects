/**
 * Title: Answer Viewer
 * Author: Z.Ch.
 * Version: 1.0.11.30
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
	require(["text!./../../answerviewer/text/main.html", "json!./../../answerviewer/data/mock.json"], function(text, data) {
		util.fillAll(data.title, 'title');
		var html = util.render(data, text);
		util.fillAll(html, 'body');

	});
});
