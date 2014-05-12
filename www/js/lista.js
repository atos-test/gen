var lista = {
    fichero : "data/hojaProductos.xml",
    hojaProductos: null,

    initialize: function() {
        var self = lista;
        self.loadXML();
        self.bindEvents();
    },

    loadXML: function(){
        var self = lista;
        console.log("loadXML");

        cargaXML.loadXML(self.fichero,function(dataJSON){
            self.hojaProductos = dataJSON;
            console.log("Cargados datos de hojaProductos");
        });

        console.log("Lista: ", self.hojaProductos.chojaProductos.Productos);
    },

    bindEvents: function() {
        console.log("Estoy en lista");
    },
};
