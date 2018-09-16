var starturl = "http://vistar-capture.web.cern.ch/vistar-capture/lhc1.png";
var urls = {
    "Overview": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard.png",
    "1Hour": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard0.png",
    "6Hours": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard1.png",
    "12Hours": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard2.png",
    "1Day": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard3.png",
    "2Days": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard4.png",
    "7Days": "http://lhcdashboard-images.web.cern.ch/lhcdashboard-images/images/lhc/prod/dashboard5.png",
    "Page1": "http://vistar-capture.web.cern.ch/vistar-capture/lhc1.png",
    "Statusop": "http://vistar-capture.web.cern.ch/vistar-capture/lhc3.png",
    "Config": "http://vistar-capture.web.cern.ch/vistar-capture/lhcconfig.png",
    "Cryo": "http://vistar-capture.web.cern.ch/vistar-capture/lhc2.png",
    "Coll1": "http://vistar-capture.web.cern.ch/vistar-capture/lhccolli1.png",
    "Coll2": "http://vistar-capture.web.cern.ch/vistar-capture/lhccolli2.png",
    "Planning": "http://vistar-capture.web.cern.ch/vistar-capture/lhccoord.png",
    "Magnets": "http://vistar-capture.web.cern.ch/vistar-capture/lhcexpmag.png",
    "Luminosity": "http://vistar-capture.web.cern.ch/vistar-capture/lhclumi.png",
    "Dump": "http://vistar-capture.web.cern.ch/vistar-capture/lhcbds.png",
    "SPS": "http://vistar-capture.web.cern.ch/vistar-capture/sps1.png",
    "CPS": "http://vistar-capture.web.cern.ch/vistar-capture/cps.png",
    "PSB": "http://vistar-capture.web.cern.ch/vistar-capture/psb.png",
    "Linac II": "http://vistar-capture.web.cern.ch/vistar-capture/lin.png"};


window.onload = function () {
    var rbuttons = document.getElementsByName("r");
    for (var i = 0, max = rbuttons.length; i < max; i++) {
        rbuttons[i].onclick = function() {
        update(this.value);
        }
    }
    document.getElementById("update").onclick = function () {
        update();
    }	
    document.getElementById('announcer').onclick = function () {
        toggleAnnouncer();
    }
    document.getElementById('list_events').onclick = function () {
        toggleEventsList();
    }
    update();
    autoupdate();
}

function toggleAnnouncer(){
    var announcer = document.getElementById('announcer').checked;
    if(announcer == true){
        document.getElementById('announcer_label').style.color = '#0f2';
        init();
     }else{
        location.reload(true);
     }
}

function toggleEventsList(){
    var list_events = document.getElementById('list_events').checked;
    var events_div = document.getElementById('announcer_events');
    var element = document.getElementById('data');

    var cumulativeOffset = function(element) {
        var topp = 0, left = 0;
        do {
            topp += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            topp: topp,
            left: left
         };
        };

    if(list_events == true){
        var offsets = cumulativeOffset(element);
        topp = offsets.topp;
        topp = topp + 81;
        topp = topp + 'px';
        left = offsets.left;
        left = left + 1;
        left = left + 'px';
        events_div.style.top = topp;
        events_div.style.left = left;
        events_div.style.visibility = 'visible';
    }else{
        events_div.style.visibility = 'hidden';
    }
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


function autoupdate() {
    if (document.querySelector('input[name = "r"]:checked').value == "Page1") {
        update();        
    }
    setTimeout(autoupdate, 60000);
}
