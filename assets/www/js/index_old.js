	// Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {

    }
	
	$( document ).bind( 'mobileinit', function(){
		$.mobile.page.prototype.options.domCache = false;
		$.mobile.allowCrossDomainPages = true;
		$.support.cors = true;
		$.mobile.loadingMessage = "Carregando...";
		$.mobile.pageLoadErrorMessage = "Erro ao carregar a página...";
	});
	
	$( '#listaAtividades' ).live( 'pageinit',function(event){
	
		$( '#btnTMB' ).live( 'tap',function(event){
			console.log($("#numberIMC").text().parseInt());
			if($("#numberIMC").text().parseInt() > 25){
				$.mobile.changePage("#TMB");
			}
			else{
				$.mobile.changePage("#TMBMM");
			}
		
		});
		
		$( '#btnGET' ).live( 'tap',function(event){
			
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}

		});
		
		$( '#btnAtividade' ).live( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
		
		$( '#btnPerfil' ).live( 'tap',function(event){
			$.mobile.changePage("#page");
		});
	});
	
	$( '#atividade' ).live( 'pageinit',function(event){
	
		$( '#btnTMB' ).live( 'tap',function(event){
			
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#TMB");
			}
			else{
				$.mobile.changePage("#TMBMM");
			}
		
		});
		
		$( '#btnGET' ).live( 'tap',function(event){
			
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}

		});
		
		$( '#btnAtividade' ).live( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
		
		$( '#btnPerfil' ).live( 'tap',function(event){
			$.mobile.changePage("#page");
		});
	});	
	
	
	$( '#page' ).live( 'pageinit',function(event){
		$( '#btnSair' ).live( 'tap',function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});
	
		$("#numberAltura").focusout(function() {
			calcularIMC();
		});
		
		$("#numberMassa").focusout(function() {
			calcularIMC();
		});
		
		$( '#btnTMB' ).live( 'tap',function(event){
				console.log($("#numberIMC").text());
				if($("#numberIMC").text() > 25){
					$.mobile.changePage("#TMB");
				}
				else{
					$.mobile.changePage("#TMBMM");
				}
		});
		
		$( '#btnGET' ).live( 'tap',function(event){
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividade' ).live( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
	});
	
	$( '#TMB' ).live( 'pageinit',function(event){
		$( '#btnTMBMG' ).live( 'tap',function(event){
			$.mobile.changePage("#TMBMG");
		});
		$( '#btnTMBMM' ).live( 'tap',function(event){
			$.mobile.changePage("#TMBMM");
		});
	});

	$( '#GET' ).live( 'pageinit',function(event){
		$( '#btnGETMG' ).live( 'tap',function(event){
			$.mobile.changePage("#GETMG");
		});
		$( '#btnGETMM' ).live( 'tap',function(event){
			$.mobile.changePage("#GETMM");
		});
	});
	
	$( '#TMBMG' ).live( 'pageinit',function(event){
		$("#pTMBMG").text(calcularTMBG().toFixed(2));
		$("#pTMBMG").css("font-weight","bold");
		
		$( '#btnSairTMBMG' ).live( 'tap',function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});
		
		$( '#btnPerfilTMBMG' ).live( 'tap',function(event){
			$.mobile.changePage("#page");
		});
		
		$( '#btnGETTMBMG' ).live( 'tap',function(event){
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividadeTMBMG' ).live( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
	});
	
	$( '#TMBMM' ).live( 'pageinit',function(event){
		console.log("Page #TMBMM init.");
		$("#pTMBMM").text(calcularTMB().toFixed(2));
		$("#pTMBMM").css("font-weight","bold");
		
		$( '#btnSairTMBMM' ).live( 'tap',function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});
		
		$( '#btnPerfilTMBMM' ).live( 'tap',function(event){
			$.mobile.changePage("#page");
		});
		
		$( '#btnGETTMBMM' ).live( 'tap',function(event){
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividadeTMBMM' ).live( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
	});
	
	$( '#GETMG' ).live( 'pageinit',function(event){
		console.log("Page #GETMG init.");
		$("#pGETMG").text("GET: " + calcularGET().toFixed(2));
		$("#pGETMG").css("font-weight","bold");
	});
	
	$( '#GETMM' ).live( 'pageinit',function(event){
		console.log("Page #GETMM init.");
		$("#pGETMM").text("GET: " + calcularGET());
		$("#pGETMM").css("font-weight","bold");
	});
	
	function calcularIMC(){
		var IMC = 0;
		var massa = 0;
		var altura = 0;
		massa = $("#numberMassa").val();
		altura = $("#numberAltura").val() / 100;
		if(massa > 0 && altura > 0){
			IMC = massa / (altura * altura);
			$("#numberIMC").text(IMC.toFixed(2));
		}
		else{
			$("#numberIMC").text(null);
		}
		
		getClassificacao(IMC);
	}
	
	function calcularPesoIdeal(){
		var IMC = 22.5;
		var massa = 0;
		var altura = 0;
		altura = $("#numberAltura").val() / 100;
		massa = IMC * (altura * altura);
		console.log(massa);
		return massa;
	}
	
	function getClassificacao( IMC){
	
		if(IMC < 18){
			$("#classIMC").text("Baixo");
			console.log("Baixo: " + IMC);
		}
		if(IMC >= 18 && IMC < 25){
			$("#classIMC").text("Médio");
			console.log("Médio: " + IMC);
		}
		if(IMC >= 25 && IMC < 30){
			$("#classIMC").text("Elevado");
			console.log("Elevado: " + IMC);
		}
		if(IMC >= 30){
			$("#classIMC").text("Muito Elevado");
			console.log("Muito Elevado: " + IMC);
		}
	
	}
	
	function calcularTMBG(){
		var idade = $("#sliderIdade").val();
		var massa = calcularPesoIdeal();
		var sexo = "";
		sexo = $('#selectGenero1a').filter(':checked').val();
		var TMB = 0;
		if(idade >= 0 && idade <= 3){
			if(sexo == "Masculino"){
				TMB = 60.9 * massa + 54;
			}
			else{
				TMB = 61.0 * massa + 51;
			}
		}
		if(idade >= 4 && idade <= 10){
			if(sexo == "Masculino"){
				TMB = 22.7 * massa + 495;
			}
			else{
				TMB = 22.5 * massa + 499;
			}
		}
		if(idade >= 11 && idade <= 18){
			if(sexo == "Masculino"){
				TMB = 17.5 * massa + 651;
			}
			else{
				TMB = 12.2 * massa + 746;
			}
		}
		if(idade >= 19 && idade <= 30){
			if(sexo == "Masculino"){
				TMB = 15.3 * massa + 679;
			}
			else{
				TMB = 14.7 * massa + 496;
			}
		}
		if(idade >= 31 && idade <= 60){
			if(sexo == "Masculino"){
				TMB = 11.6 * massa + 879;
			}
			else{
				TMB = 8.7 * massa + 829;
			}
		}
		if(idade > 60){
			if(sexo == "Masculino"){
				TMB = 13.5 * massa + 487;
			}
			else{
				TMB = 10,5 * massa + 596;
			}
		}
		console.log("TMB Calculado");
		return TMB;
	}
	
	function calcularTMB(){
		var idade = $("#sliderIdade").val();
		var massa = $("#numberMassa").val();
		var sexo = "";
		sexo = $('#selectGenero1a').filter(':checked').val();
		var TMB = 0;
		if(idade >= 0 && idade <= 3){
			if(sexo == "Masculino"){
				TMB = 60.9 * massa + 54;
			}
			else{
				TMB = 61.0 * massa + 51;
			}
		}
		if(idade >= 4 && idade <= 10){
			if(sexo == "Masculino"){
				TMB = 22.7 * massa + 495;
			}
			else{
				TMB = 22.5 * massa + 499;
			}
		}
		if(idade >= 11 && idade <= 18){
			if(sexo == "Masculino"){
				TMB = 17.5 * massa + 651;
			}
			else{
				TMB = 12.2 * massa + 746;
			}
		}
		if(idade >= 19 && idade <= 30){
			if(sexo == "Masculino"){
				TMB = 15.3 * massa + 679;
			}
			else{
				TMB = 14.7 * massa + 496;
			}
		}
		if(idade >= 31 && idade <= 60){
			if(sexo == "Masculino"){
				TMB = 11.6 * massa + 879;
			}
			else{
				TMB = 8.7 * massa + 829;
			}
		}
		if(idade > 60){
			if(sexo == "Masculino"){
				TMB = 13.5 * massa + 487;
			}
			else{
				TMB = 10,5 * massa + 596;
			}
		}
		console.log("TMB Calculado");
		return TMB;
	}
	
	function calcularGET(){
		var GET = "";
		var TMB = calcularTMB();
		var atividade = "";
		var sexo = "";
		sexo = $('#selectGenero1a').filter(':checked').val();
		if($('#selectAtividade1a').filter(':checked').val() == "INATIVIDADE"){
			if(sexo == "Masculino"){
				GET = 1.25 * TMB;
			}
			else{
				TMB = 1.3 * TMB;
			}
		}
		if($('#selectAtividade1b').filter(':checked').val() == "LEVE"){
			if(sexo == "Masculino"){
				GET = 1.55 * TMB;
			}
			else{
				TMB = 1.56 * TMB;
			}
		}
		if($('#selectAtividade1c').filter(':checked').val() == "MODERADA"){
			if(sexo == "Masculino"){
				GET = 1.78 * TMB;
			}
			else{
				TMB = 1.64 * TMB;
			}
		}
		if($('#selectAtividade1d').filter(':checked').val() == "PESADA"){
			if(sexo == "Masculino"){
				GET = 2.10 * TMB;
			}
			else{
				TMB = 1.82 * TMB;
			}
		}
	}
	
	function carregaAtividade(nome, met){
		$("#headerAtividade").text(nome + " (" + met + " METS)");
		$.mobile.changePage("#atividade");
	}