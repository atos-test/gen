var app = {

    initialize: function() {
        var self = app;
        app.bindEvents();
    },

    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $("#btnIr").off("vclick").on("vclick", function(){
            window.location.href = "lista.html";
            //$.mobile.pageContainer.pagecontainer("change", "lista.html", { transition: "slide", reverse: false });
        });
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
