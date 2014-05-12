var lista = {
    fichero : "data/hojaContactos.xml",
    hojaContactos: null,
    contactos: null,
    anchoDocument: 0,

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

        /*El ancho de la lista es el 95% del ancho de la pantalla*/
        self.anchoDocument = $(document).width();
        var anchoLista = self.anchoDocument * 0.95;

        /*El 5% restante se reparte entre padding-left y padding-right*/
        var anchoRestanteLista = self.anchoDocument - anchoLista;
        $("#listaContactos").css({ 'padding-left': anchoRestanteLista/2});
        $("#listaContactos").css({ 'padding-right': anchoRestanteLista/2});
        $("#listaContactos").width(anchoLista);

        /*El ancho de la imagen es el 25% de cada elemento*/
        var anchoImg = anchoLista*0.25;
        self.setHeightImg(anchoImg);

        console.log("anchoDocument: ", self.anchoDocument);
        console.log("anchoLista: ", anchoLista);
        console.log("anchoImg: ", anchoImg);
    },

    setHeightImg: function(ancho){
        var self = lista;
        var img = document.getElementsByName("imgName");
        $(img).height(ancho);
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

        /*Capturamos el evento de click de cada imagen*/
        var img = document.getElementsByName("imgName");

        $(img).each(function(index){
            $(this).on("vclick",function(){
                console.log("Click: ", this.id);
            });
        });
    },
};