/**
 * Title: Shadow Dom
 * Author: Z.Ch.
 * Version: 1.0.10.11
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
	require(["text!./../../shadowDom/text/main.html", "json!./../../shadowDom/data/mock.json"], function(text, data) {
		util.fillAll(data.title, 'title');
		var html = util.render(data, text);
		util.fillAll(html, 'body');

		var host = $('.footer')[0];
		var root = host.createShadowRoot();
		var tpl = $('.tpl-footer')[0];
		root.appendChild(document.importNode(tpl.content, true));

		var lightA = $('.light')[0];
		var lightB = $('.light')[1];
		var tplLight = $('.tpl-lights')[0];
		lightA.createShadowRoot().appendChild(document.importNode(tplLight.content, true));
		lightB.createShadowRoot().appendChild(document.importNode(tplLight.content, true));

		$('.light').on('click', function(e) {
			var lightColor = $(this).parent();
			if(lightColor.hasClass('day')) {
				lightColor.removeClass('day');
				lightColor.addClass('night');
			} else {
				lightColor.addClass('day');
				lightColor.removeClass('night');
			}
		});



	});
});
