var lista = {
    fichero : "data/hojaContactos.xml",
    hojaContactos: null,
    contactos: null,

    initialize: function() {
        var self = lista;
        self.loadXML();
        self.refreshView();
        self.bindEvents();
    },

    loadXML: function(){
        var self = lista;

        cargaXML.loadXML(self.fichero,function(dataJSON){
            self.hojaContactos = dataJSON;
            self.contactos = self.hojaContactos.chojaContactos.Contactos.cContacto;
        });

        console.log("Lista: ", self.contactos);
    },

    refreshView: function(){
        var self = lista;

        self.cargaTemplateLista();

        self.resizeImg();
    },

    resizeImg: function(){
        var self = lista;

        $("#listaContactos").listview().listview('refresh');

        var heightImg = $("#imgcon0Id").height();

        console.log("Altura img-->", heightImg);
    },

    cargaTemplateLista: function(){
        var self = lista;

        //Template de lista
        var template = _.template($('#contactos-template').html(), {contactos : self.contactos});
        $('#listaContactos').html(template);
        $("#listaContactos").listview().listview('refresh');
        console.log("Pintado");

    },

    bindEvents: function() {
        $("#btnPanel").on("vclick", function(){
            $("#mypanel").panel( "open");
        });
    },
};
