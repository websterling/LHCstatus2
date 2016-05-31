function update(url) {
    if (!url) {
        url = lasturl;
    }
    var now = new Date(); 
    now = "?" + now.getTime();
    document.getElementById('data').src = url + now;
    lasturl = url;
} 
