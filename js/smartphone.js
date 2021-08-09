///////////////////////////////////////////////////////////////////////////////////////////
//　スマホ用URL書き換えスクリプト
//　head要素内でこのスクリプトを読み込み、
//　書き換えたいa要素に「rel="alternate"」を追加。
//　例）<a href="sample.html" rel="alternate">Text</a>
//　　　スマホでは<a href="tel:0000000000" rel="alternate">Text</a>と出力。
//　　　<a href="javascript:void(0);" rel="alternate">Text</a>。


function spLinks() {

	var spurl = "tel:0462589640";  //スマホ用URLを設定

	if((navigator.userAgent.indexOf('iPhone') > 0 ) || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0){
		if(document.getElementsByTagName) {
			var anchors = document.getElementsByTagName("a");
			for (var i=0; i<anchors.length; i++) {
				var anchor = anchors[i];
				if (anchor.getAttribute("href") &&
				((anchor.getAttribute("rel") == "alternate")))
				anchor.href = spurl;
			}
		}
	}

}

if(window.addEventListener) {
	window.addEventListener("load", spLinks, false);
}else if(window.attachEvent) {
	window.attachEvent("onload", spLinks);
}

///////////////////////////////////////////////////////////////////////////////////////////
