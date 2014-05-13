var lista = {
    fichero : "data/hojaContactos.xml",
    hojaContactos: null,
    contactos: null,
    anchoDocument: 0,
    alturaDocument: 0,

    initialize: function() {
        var self = lista;
        self.alturaDocument = $(document).height();
        self.anchoDocument = $(document).width();
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
    },

    refreshView: function(){
        var self = lista;

        //Si estoy en LANDSCAPE cargo un template para detalle
        if(window.orientation == -90 || window.orientation == 90) {

            self.cargaLandscape();

        }
        //Si estoy en PORTRAIT cargo los templates hechos anteriormente
        else{

            self.cargaPortrait();
        }

    },

    cargaLandscape: function(){
        var self = lista;

        self.cargaLista();
    },

    cargaPortrait: function(){
        var self = lista;

        self.cargaLista();
    },

    cargaLista: function(){
        var self = lista; 

        self.cargaTemplateLista();

        self.resizeImg();
    },

    actualizarAltoAncho: function(){
        var self = lista;

        var aux = self.alturaDocument;
        self.alturaDocument = self.anchoDocument;
        self.anchoDocument = aux;

        /*console.log("Ancho: ", self.anchoDocument);
        console.log("Alto: ", self.alturaDocument);*/
    },

    resizeImg: function(){
        var self = lista;

        $("#listaContactos").listview().listview('refresh');

        /*El ancho de la lista es el 95% del ancho de la pantalla*/
        var anchoLista = self.anchoDocument * 0.95;

        /*El 5% restante se reparte entre padding-left y padding-right*/
        var anchoRestanteLista = self.anchoDocument - anchoLista;
        $(".contentLista").css({ 'padding-left': anchoRestanteLista/2});
        $(".contentLista").css({ 'padding-right': anchoRestanteLista/2});
        $(".contentLista").width(anchoLista);

        /*El ancho de la imagen es el 25% de cada elemento*/
        var anchoImg = anchoLista*0.25;
        self.setHeightImg(anchoImg);

        /*El alto de cada elemento de la lista es el alto de la imagen*/
        $(".elementoLista").height(anchoImg);

        /*Calculamos el tamaño de la letra de la información del contacto*/
        /*El 12% del ancho de la imagen*/
        var tamLetra = anchoImg*0.012 + "em";
        $(".letraContacto").css({ 'font-size': tamLetra});

        /*console.log("anchoDocument: ", self.anchoDocument);
        console.log("anchoLista: ", anchoLista);
        console.log("anchoImg: ", anchoImg);*/
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

    },

    bindEvents: function() {
        var self = lista;

        $("#btnPanel").on("vclick", function(){
            $("#mypanel").panel( "open");
        });

        $("#btnAdd").on("vclick", function(){
            window.location.href = "infoContacto.html";
        });

        /*Capturamos el evento de click de cada imagen*/
        var img = document.getElementsByName("imgName");

        $(img).each(function(index){
            $(this).on("vclick",function(){
                console.log("Click: ", this.id);
            });
        });

        /*Capturamos el evento de click de cada imagen*/
        var contacto = document.getElementsByName("contactoName");

        $(contacto).each(function(index){
            $(this).on("vclick",function(){
                console.log("Click: ", this.id);
            });
        });

        window.onorientationchange = function() {
            self.actualizarAltoAncho();
            //Si estoy en LANDSCAPE cargo un template para detalle
            if(window.orientation == -90 || window.orientation == 90) {

                self.cargaLandscape();

            }
            //Si estoy en PORTRAIT cargo los templates hechos anteriormente
            else{
                
                self.cargaPortrait();
            }
            self.bindEvents();
        }
    },
};