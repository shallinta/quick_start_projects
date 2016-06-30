/**
 * Title: web weixin
 * Author: Z.Ch.
 * Version: 0.0.8.24
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
	require(["text!/webwx/text/main.html", "json!/webwx/data/mock.json"], function(text, data) {
		util.fillAll(data.title, 'title');

		var modules = [
			"text!/webwx/text/panel.html",
			"text!/webwx/text/panel/menuBar.html",
			"text!/webwx/text/panel/tabBar.html",
			"text!/webwx/text/panel/msgBox.html",
			"text!/webwx/text/dialog.html",
			"text!/webwx/text/dialog/chatTitleBox.html",
			"text!/webwx/text/dialog/chatContentBox.html",
			"text!/webwx/text/dialog/chatInputBox.html",
		];
		require(modules, function(htmlPanel, menuBar, tabBar, msgBox, htmlDialog, chatTitleBox, chatContentBox, chatInputBox){

			htmlPanel = util.render({
				menuBar: menuBar,
				tabBar: tabBar,
				msgBox: msgBox
			}, htmlPanel);

			htmlDialog = util.render({
				chatTitleBox: chatTitleBox,
				chatContentBox: chatContentBox,
				chatInputBox: chatInputBox
			}, htmlDialog);

			var html = util.render({
				panel: htmlPanel,
				dialog: htmlDialog
			}, text);

			util.fillAll(html, 'body');

			$('.tab').on('click', function(event) {
				if(this.className.indexOf('active') > 0) return;
				$(this).addClass('active').siblings('.tab').removeClass('active');
				var index = $(this).index();
				if(index === 0) {
					$('.msgList').removeClass('hide').siblings('div').addClass('hide');
					$('.chatContactTitle').addClass('hide');
					$('.chatMsgTitle').removeClass('hide');
					$('.chatContactInfo').addClass('hide');
					$('.chatMsgBox, .chatEmpty').removeClass('hide');
					$('.chatInputBox').removeClass('hide');
				} else if (index === 1) {
					$('.contactList').removeClass('hide').siblings('div').addClass('hide');
					$('.chatMsgTitle').addClass('hide');
					$('.chatContactTitle').removeClass('hide');
					$('.chatMsgBox, .chatEmpty').addClass('hide');
					$('.chatContactInfo').removeClass('hide');
					$('.chatInputBox').addClass('hide');
				}
			});


			var popups = [
				'text!/webwx/text/popup/profile.html'
			];

			require(popups, function(profile) {
				$('body').on('click', function(event) {
					if(event.target.className.indexOf('profile') < 0) {
						$('.popProfile').remove();
						return;
					}
					var x = event.pageX;
					var y = event.pageY;
					$('.popProfile').remove();
					$('body').append(profile);
					$('.popProfile').css({
						top: y+20,
						left: x
					});

				});
			});


			$('.menu').on('click', function(event) {
				event.preventDefault();
				window.open('./login.html', '_self');
			});


		});



	});
});