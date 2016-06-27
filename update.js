var starturl = "http://vistar-capture.web.cern.ch/vistar-capture/lhc1.png";
var urls = {
	"Overview":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard.png",
	"Hour1":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard0.png",
	"Hours6":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard1.png",
	"Hours12":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard2.png",
	"Day1":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard3.png",
	"Days2":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard4.png",
	"Days7":"http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard5.png",
	"Page1":"http://vistar-capture.web.cern.ch/vistar-capture/lhc1.png",
	"Statusop":"http://vistar-capture.web.cern.ch/vistar-capture/lhc3.png",
	"Config":"http://vistar-capture.web.cern.ch/vistar-capture/lhcconfig.png",
	"Cryo":"http://vistar-capture.web.cern.ch/vistar-capture/lhc2.png",
	"Coll1":"http://vistar-capture.web.cern.ch/vistar-capture/lhccolli1.png",
	"Coll2":"http://vistar-capture.web.cern.ch/vistar-capture/lhccolli2.png",
	"Planning":"http://vistar-capture.web.cern.ch/vistar-capture/lhccoord.png",
	"Magnets":"http://vistar-capture.web.cern.ch/vistar-capture/lhcexpmag.png",
	"Luminosity":"http://vistar-capture.web.cern.ch/vistar-capture/lhclumi.png",
	"Dump":"http://vistar-capture.web.cern.ch/vistar-capture/lhcbds.png",
	"SPS":"http://vistar-capture.web.cern.ch/vistar-capture/sps1.png",
	"CPS":"http://vistar-capture.web.cern.ch/vistar-capture/cps.png",
	"PSB":"http://vistar-capture.web.cern.ch/vistar-capture/psb.png",
	"LinacII":"http://vistar-capture.web.cern.ch/vistar-capture/lin.png"}

window.onload = function(){
    var rbuttons = document.getElementsByName("r");
    for(var i = 0, max = rbuttons.length; i < max; i++) {
        rbuttons[i].onclick = function() {
        update(this.value);
        }
    }
     document.getElementById("update").onclick = function() {
        update();
    }	
    update();
}


function update(url) {
    if (!url) {
        url = starturl;
    } else {

	url = urls[url];
    }

    var now = new Date(); 
    now = "?" + now.getTime(); // change query value so we get a real reload
    document.getElementById('data').src = url + now;
    starturl = url;
}
