var infoContacto = {
    nombreContacto: "",
    apellidosContacto: "",
    movilContacto: "",
    fijoContacto: "",
    mailContacto: "",
    direccionContacto: "",

    initialize: function() {
        var self = infoContacto;
        self.bindEvents();
    },

    vacioInput: function(input, index){

    	if (input[index].value != "") {
    		input[index].className="";
    	}
    	else{
    		input[index].className="inputIncorrecto";
    	}

    },

    checkInputMovil: function(){
        var self = infoContacto;

        if(!/^[0-9]{9}$/.test($("#inputMovil").val())){
            $("#inputMovil").addClass("inputIncorrecto");
            self.showPopUp("Escriba un número de teléfono correcto");
            return false;
        }
        else{
            $("#inputMovil").removeClass("inputIncorrecto");
            return true;
        }
    },

    checkInputFijo: function(){
        var self = infoContacto;

        /*Puede tener entre 8-9 dígitos o no tener nada*/
        if ($("#inputFijo").val() != "") {
            if(!/^[0-9]{8,9}$/.test($("#inputFijo").val())){
                $("#inputFijo").addClass("inputIncorrecto");
                self.showPopUp("Escriba un número de teléfono correcto");
                return false;
            }
            else{
                $("#inputFijo").removeClass("inputIncorrecto");
                return true;
            }
        }
        else{
            $("#inputFijo").removeClass("inputIncorrecto");
            return true;
        }
        
    },

    checkInputMail: function(){
        var self = infoContacto;

        /*Puede tener entre 8-9 dígitos o no tener nada*/
        if ($("#inputMail").val() != "") {
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($("#inputMail").val())){
                $("#inputMail").addClass("inputIncorrecto");
                self.showPopUp("Escriba el patrón: mail@dominio.com");
                return false;
            }
            else{
                $("#inputMail").removeClass("inputIncorrecto");
                return true;
            }
        }
        else{
            $("#inputMail").removeClass("inputIncorrecto");
            return true;
        }
        
    },

    /*Recogemos la información que aparece en los inputs*/
    getInfoInputs: function(){
    	var self = infoContacto;

    	/*Comprobamos que si están vacios los campos obligatorios*/
    	var inputsObligatorios = document.getElementsByName("inputObligatorio");

        /*Si están vacios, los marcamos de rojo*/
    	$(inputsObligatorios).each(function(index){
            self.vacioInput($(inputsObligatorios), index);
        });

        var invalido = false;
        /*Comprobamos si hay algun input en rojo. Al detectar al primero así, mostramos el popup*/
        $(inputsObligatorios).each(function(index){
            invalido = $(inputsObligatorios)[index].className=="inputIncorrecto";            
            return(invalido!=true);
        });

        if(invalido){
            self.showPopUp("Debe rellenar los campos seleccionados");
            return;
        }

        /*Comprobamos que cada input siga un patron concreto: tlf--> numeros...*/
        var okMovil = self.checkInputMovil();
        var okFijo = self.checkInputFijo();
        var okMail = self.checkInputMail();

        if(okMovil && okFijo && okMail){
            self.nombreContacto = $("#inputNombre").val();
            self.apellidosContacto = $("#inputApellidos").val();
            self.movilContacto = $("#inputMovil").val();
            self.fijoContacto = $("#inputFijo").val();
            self.mailContacto = $("#inputMail").val();
            self.direccionContacto = $("#inputDireccion").val();

            console.log("Datos OK");
        }
        else{
            console.log("Datos NO ok");
        }

    },

    showPopUp: function(message){
        $("#errorTxt").text(message);
        $("#errorPopup").popup("open", {positionTo: '#headerNuevo'});
    },

    bindEvents: function() {
        var self = infoContacto;

        $("#btnAceptarInfo").on("vclick", function(){
        	self.getInfoInputs();
        });

        $("#btnCancelarInfo").on("vclick", function(){
        	window.location.href = "lista.html";
        });
    },
};
