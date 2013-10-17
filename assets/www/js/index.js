	var genre;
	var age;
	var weight;
	var height;
	var id;
	var selectedatividade;
	var selectedatividadeMet;
	var totalDiario;
	var idAtividade;
	var getDetalhado;
	
    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(createTable, errorCB, createTableSucess);
		document.addEventListener("menubutton", onMenuKeyDown, false);
                if (window.devicePixelRatio == 1.5) {
                        //alert("This is a high-density screen");
                      } else if (window.devicePixelRatio == 0.75) {
                        //alert("This is a low-density screen");
                      }
                      //alert(window.devicePixelRatio);
    }
	
	// Handle the menu button
    //
    function onMenuKeyDown() {
		var r=confirm("Fechar aplicativo?")
		if (r==true)
		  {
		  	navigator.app.exitApp();;
		  }
		else
		  {
		  	
		  }
    }
	
	function createTable(tx){
		//tx.executeSql('DROP TABLE IF EXISTS ATIVIDADES');
        tx.executeSql('CREATE TABLE IF NOT EXISTS PERFIL (cod, genre, age, weight, height)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ATIVIDADES (id INTEGER PRIMARY KEY AUTOINCREMENT, atividade, duracao, kcal)');
	}
	
	function removeActivity(tx){
		tx.executeSql('DELETE FROM ATIVIDADES WHERE id = "' + idAtividade + '"' );	
	}
	
	function removeActivitySucess(){
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(loadActivity, errorCB);
		$('#atividadeExcluida').popup("open");
	}
	
	function addActivity(tx){
		tx.executeSql("INSERT INTO ATIVIDADES (atividade, duracao, kcal) VALUES('"+ selectedatividade +"','"+ $("#duracaoAtividade").val() +"','"+ $('#kcalAtividade').val() +"')");	
	}
	
	function errorCB(err) {
        console.log("Error processing SQL: "+ err.message);
    }
	
	function createTableSucess(tx) {
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
        db.transaction(queryDB, errorCB);
    }
	
	function loadActivity(tx){
		tx.executeSql('SELECT * FROM ATIVIDADES', [], queryActivitySuccess, errorCB);
	}
	
	function queryActivitySuccess(tx, results){
		var total = 0;
		var total1 = 0;
                var len = results.rows.length;
            var parent = document.getElementById('gridAtividades');
            parent.innerHTML = '<li data-role="list-divider">Resgistro de atividades</li>';
            for (var i=0; i<len; i++){
                        total = total + parseFloat(results.rows.item(i).duracao);
			total1 = total1 + parseFloat(results.rows.item(i).kcal);
                    parent.innerHTML = parent.innerHTML + '<li><a href="#" onClick="excluirAtividade('+ results.rows.item(i).id +');"><p>"'+ results.rows.item(i).atividade +'"</p> <p>'+ results.rows.item(i).duracao +' minutos</p><p>'+ results.rows.item(i).kcal +' kcal</p></a></li>';
            }
            totalDiario = total /60;
            parent.innerHTML = parent.innerHTML + '<li data-role="list-divider">'+ totalDiario.toFixed(2) +' horas ('+ total.toFixed(2) +' min) '+ total1.toFixed(2) +' kcal.</li>';
            
            $(parent).listview("refresh");
		/*$('#gridAtividades').html('<ul data-role="listview" data-inset="true" id="gridAtividades">');
		for (var i=0;i<results.rows.length;i++)
		{ 
			$('#gridAtividades').append('<li><a href="#">Apple</a></li><li><a href="#" onClick="excluirAtividade('+ results.rows.item(i).id +');">Executar a atividade <strong>"'+ results.rows.item(i).atividade +'"</strong> por <strong>'+ results.rows.item(i).duracao +'</strong> minutos, consumiu <strong>'+ results.rows.item(i).kcal +'</strong> calorias.</a></li>');
			total = total + parseFloat(results.rows.item(i).duracao);
			total1 = total1 + parseFloat(results.rows.item(i).kcal);
		}
		totalDiario = total /60;
		$('#gridAtividades').append('<li>Total '+ totalDiario.toFixed(2) +' ('+ total.toFixed(2) +')'+ total1 +'</li>');*/
		getDetalhado = total1;
	}
	
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM PERFIL WHERE cod = 1', [], querySuccess, errorCB);
    }
	
	function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        // this will be true since it was a select statement and so rowsAffected was 0
        if (results.rows.length == 0) {
            console.log('Perfil ainda não foi criado!');
			tx.executeSql('INSERT INTO PERFIL (cod, genre, age, weight, height) VALUES (1, "Masculino", 21, 0, 0)');
            return false;
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log('Perfil criado!');
		console.log(results.rows.item(0).genre);
		if(results.rows.item(0).genre == "Masculino"){
			$('#selectGenero1a').attr("checked",true).checkboxradio("refresh");
			$('#selectGeneroa').attr("checked",false).checkboxradio("refresh");
		}
		else{
			$('#selectGeneroa').attr("checked",true).checkboxradio("refresh");
			$('#selectGenero1a').attr("checked",false).checkboxradio("refresh");
		}
		$("#sliderIdade").val(results.rows.item(0).age);
		$("#numberMassa").val(results.rows.item(0).weight);
		$("#numberAltura").val(results.rows.item(0).height);
		calcularIMC();
		console.log("Get Perfil");
    }	
	
	function getPerfil(tx){
		tx.executeSql('SELECT * FROM PERFIL WHERE cod = 1', [], getPerfilSucess, errorCB);
	}
	
	function getPerfilSucess(tx, results){
		console.log("Returned rows = " + results.rows.length);
        // this will be true since it was a select statement and so rowsAffected was 0
        if (results.rows.length < 1) {
            console.log('No rows affected!');
            return false;
        }
        // for an insert statement, this property will return the ID of the last inserted row
        if(results.rows.item(0).genre == "Masculino"){
			$('#selectGenero1a').attr("checked",true).checkboxradio("refresh");
			$('#selectGeneroa').attr("checked",false).checkboxradio("refresh");
		}
		else{
			$('#selectGeneroa').attr("checked",true).checkboxradio("refresh");
			$('#selectGenero1a').attr("checked",false).checkboxradio("refresh");
		}
		$("#sliderIdade").val(results.age);
		$("#numberMassa").val(results.weight);
		$("#numberAltura").val(results.height);
		console.log("Get Perfil");
	}
	
	function savePerfil(){
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(updatePerfil, errorCB, updateSucess);
	}
	
	function updatePerfil(tx){
		console.log($('#selectGenero1a').filter(':checked').val());
		genre = $('#selectGenero1a').filter(':checked').val();
		if(genre!="Masculino")
		{
			genre = "Feminino";
		}
		console.log(genre);
		age = $("#sliderIdade").val();
		weight = $("#numberMassa").val();
		height = $("#numberAltura").val();
		tx.executeSql('UPDATE PERFIL SET genre = "' + genre + '", age = "'+ age +'", weight = "'+ weight +'", height = "'+ height +'" WHERE cod = 1');
		console.log('UPDATE PERFIL SET genre = "' + genre + '", age = "'+ age +'", weight = "'+ weight +'", height = "'+ height +'" WHERE cod = 1');
	}
	
	function updateSucess(){
		console.log('Update Sucess');
	}
	
/*	$( "#listaAtividades" ).on( "pageinit",function(event){
	
		$( '#btnTMB' ).on( 'tap',function(event){
			console.log($("#numberIMC").text().parseInt());
			if($("#numberIMC").text().parseInt() > 25){
				$.mobile.changePage("#TMB");
			}
			else{
				$.mobile.changePage("#TMBMM");
			}
		
		});
		
		$( '#btnGET' ).on( 'tap',function(event){
			
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}

		});
		
		$( '#btnAtividade' ).on( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
		
		$( '#btnPerfil' ).on( 'tap',function(event){
			$.mobile.changePage("#page");
		});
	});*/
	
	$( "#atividade" ).on( "pageinit",function(event){
	
		calcularGETAtividade();
	
		/*$( '#btnTMB' ).on( 'tap',function(event){
			
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#TMB");
			}
			else{
				$.mobile.changePage("#TMBMM");
			}
		
		});
		
		$( '#btnGET' ).on( 'tap',function(event){
			
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}

		});
		
		$( '#btnAtividade' ).on( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});
		
		$( '#btnPerfil' ).on( 'tap',function(event){
			$.mobile.changePage("#page");
		});*/
	});	
	
	
	$( "#page" ).on( "pageinit",function(event){
		//var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		//db.transaction(getPerfil, errorCB);
	
		/*$( "#btnSair" ).on( 'tap', function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});*/
	
		$("#selectGenero1a").click(function() {
			savePerfil();
			genre = "Feminino";
		});
		
		$("#selectGeneroa").click(function() {
			savePerfil();
			genre = "Masculino";
		});
		
		$("#sliderIdade").focusout(function() {
			savePerfil();
		});
		
		$("#numberAltura").focusout(function() {
			calcularIMC();
			savePerfil();
		});
		
		$("#numberMassa").focusout(function() {
			calcularIMC();
			savePerfil();
		});
		
		/*$( "#btnTMB" ).on( 'tap', function(event){
				console.log($("#numberIMC").text());
				if($("#numberIMC").text() > 25){
					$.mobile.changePage("#TMB");
				}
				else{
					$.mobile.changePage("#TMBMM");
				}
		});
		
		$( '#btnGET' ).on( 'tap',function(event){
			if($("#numberIMC").val() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividade' ).on( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});*/
		
		onDeviceReady();
	});
	
	$( "#TMB" ).on( "pageinit",function(event){
		$( '#btnTMBMG' ).on( 'tap',function(event){
			$.mobile.changePage("#TMBMG");
		});
		$( '#btnTMBMM' ).on( 'tap',function(event){
			$.mobile.changePage("#TMBMM");
		});
	});

/*	$( "#GET" ).on( "pageinit",function(event){
		$( '#btnGETMG' ).on( 'tap',function(event){
			$.mobile.changePage("#GETMG");
		});
		$( '#btnGETMM' ).on( 'tap',function(event){
			$.mobile.changePage("#GETMM");
		});
	});
*/
	$( "#TMBMG" ).on( "pageinit",function(event){
		$("#pTMBMG").text(calcularTMBG().toFixed(2));
		$("#pTMBMG").css("font-weight","bold");
		
		$("#pGETMG").text(calcularGETG().toFixed(2));
		$("#pGETMG").css("font-weight","bold");
		
		calcularResultado();
		
		/*$( '#btnSairTMBMG' ).on( 'tap',function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});
		
		$( '#btnPerfilTMBMG' ).on( 'tap',function(event){
			$.mobile.changePage("#page");
		});
		
		$( '#btnGETTMBMG' ).on( 'tap',function(event){
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividadeTMBMG' ).on( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});*/
	});
	
	$( "#TMBMM" ).on( "pageinit",function(event){
		console.log("Page #TMBMM init.");
		$("#pTMBMM").text(calcularTMB().toFixed(2));
		$("#pTMBMM").css("font-weight","bold");
		
		$("#pGETMM").text(calcularGET().toFixed(2));
		$("#pGETMM").css("font-weight","bold");
		
		calcularResultado();
		
/*		$( '#btnSairTMBMM' ).on( 'tap',function(event){
			console.log("Fechar.");
			navigator.app.exitApp();
		
		});
		
		$( '#btnPerfilTMBMM' ).on( 'tap',function(event){
			$.mobile.changePage("#page");
		});
		
		$( '#btnGETTMBMM' ).on( 'tap',function(event){
			if($("#numberIMC").text() > 25){
				$.mobile.changePage("#GET");
			}
			else{
				$.mobile.changePage("#GETMM");
			}
		});
		
		$( '#btnAtividadeTMBMM' ).on( 'tap',function(event){
			$.mobile.changePage("#listaAtividades");
		});*/
	});

	$( "#GETMG" ).on( "pageinit",function(event){	
		console.log("Page #GETMG init.");
		$("#pGETMG").text("GET: " + calcularGET().toFixed(2));
		$("#pGETMG").css("font-weight","bold");
		calcularResultado();
	});
	
	$( "#diario" ).on( "pageinit",function(event){	
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(loadActivity, errorCB);		
	});
	
	$( "#GETMM" ).on( "pageinit",function(event){
		console.log("Page #GETMM init.");
		$("#pGETMM").text("GET: " + calcularGET());
		$("#pGETMM").css("font-weight","bold");
		calcularResultado();
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
		console.log("TMB G - " + TMB);
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
		console.log("TMB - " + TMB);
		return TMB;
	}
	
	function calcularGET(){
		var GET = 0;
		var TMB = calcularTMB();
		var atividade = "";
		var sexo = "";
		if($('#selectGenero1a').filter(':checked').val() == "Masculino"){
			sexo = $('#selectGenero1a').filter(':checked').val();
		}
		else{
			sexo = 'Feminino';
		}
		if($('#selectAtividadeMM1a').filter(':checked').val() == "INATIVIDADE"){
			if(sexo == "Masculino"){
				GET = 1.25 * TMB;
			}
			else{
				GET = 1.3 * TMB;
			}
		}
		if($('#selectAtividadeMM1b').filter(':checked').val() == "LEVE"){
			if(sexo == "Masculino"){
				GET = 1.55 * TMB;
			}
			else{
				GET = 1.56 * TMB;
			}
		}
		if($('#selectAtividadeMM1c').filter(':checked').val() == "MODERADA"){
			if(sexo == "Masculino"){
				GET = 1.78 * TMB;
			}
			else{
				GET = 1.64 * TMB;
			}
		}
		if($('#selectAtividadeMM1d').filter(':checked').val() == "PESADA"){
			if(sexo == "Masculino"){
				GET = 2.10 * TMB;
			}
			else{
				GET = 1.82 * TMB;
			}
		}
		return GET;
	}
	
	function calcularGETG(){
		var GET = 0;
		var TMB = calcularTMBG();
		var atividade = "";
		var sexo = "";
		sexo = $('#selectGenero1a').filter(':checked').val();
		if($('#selectAtividadeMG1a').filter(':checked').val() == "INATIVIDADE"){
			if(sexo == "Masculino"){
				GET = 1.25 * TMB;
			}
			else{
				GET = 1.3 * TMB;
			}
		}
		if($('#selectAtividadeMG1b').filter(':checked').val() == "LEVE"){
			if(sexo == "Masculino"){
				GET = 1.55 * TMB;
			}
			else{
				GET = 1.56 * TMB;
			}
		}
		if($('#selectAtividadeMG1c').filter(':checked').val() == "MODERADA"){
			if(sexo == "Masculino"){
				GET = 1.78 * TMB;
			}
			else{
				GET = 1.64 * TMB;
			}
		}
		if($('#selectAtividadeMG1d').filter(':checked').val() == "PESADA"){
			if(sexo == "Masculino"){
				GET = 2.10 * TMB;
			}
			else{
				GET = 1.82 * TMB;
			}
		}
		console.log('GET - ' + GET);
		return GET;
	}
	
	function carregaAtividade(nome, met){
		$("#GETAtividade").val(met);
		$("#headerAtividade").text(nome);
		$("#rangeTempo").val(30);
		calcularGETAtividade();
		$.mobile.changePage("#atividade");
	}
	
	function updateGET(){
		$("#pGETMM").text(calcularGET().toFixed(2));
		$("#pGETMM").css("font-weight","bold");
		calcularResultado();
	}
	
	function updateGETG(){
		$("#pGETMG").text(calcularGETG().toFixed(2));
		$("#pGETMG").css("font-weight","bold");
		calcularResultado();
	}
	
	function calcularGETAtividade(){
		var val = $("#GETAtividade").val().replace(',','.') * ($("#rangeTempo").val() / 60) * $("#numberMassa").val();
		$("#gastoEne").text(val.toFixed(2));
		$("#gastoEne").css("font-weight","bold");
	}
	
	function calcularResultado(){
		var x;
		var y;
		var get = calcularGET().toFixed(2); //verificar se massa gorda ou normal
		console.log("GET " + get);
		console.log("Kilo " + $("#kiloMeta").val().replace(',','.'));
		console.log("Calc " + $("#kiloMeta").val() * 256.7);
		if($('#selectObjetivoA').filter(':checked').val() == "menos"){
			x = parseFloat(get) - parseFloat($("#kiloMeta").val()) * 256.7;
			console.log('Menos');
		}
		else{
			x = parseFloat(get) + parseFloat($("#kiloMeta").val()) * 256.7;
			console.log('Mais');
		}
		
		if($('#selectObjetivoA').filter(':checked').val() == "menos"){
			y = parseFloat(getDetalhado) - parseFloat($("#kiloMeta").val()) * 256.7;
			console.log('Menos Det');
		}
		else{
			y = parseFloat(getDetalhado) + parseFloat($("#kiloMeta").val()) * 256.7;
			console.log('Mais Det');
		}
		
		$("#resultadoMeta").text(parseFloat(x).toFixed(2));
		$("#resultadoMeta").css("font-weight","bold");
		
		$("#resultadoMetaDetalhado").text(parseFloat(y).toFixed(2));
		$("#resultadoMetaDetalhado").css("font-weight","bold");
		
	}
	
	function selectAtividade(atividade, met){
		$('#atividadeSelecionada').html(atividade);
		selectedatividade = atividade;
		selectedatividadeMet = met;
		calcularKcal();
		$('#listaAtividadeSelect').popup("close");
	}
	
	function calcularKcal(){
		var val = selectedatividadeMet.replace(',','.') * ($("#duracaoAtividade").val() / 60) * $("#numberMassa").val();
		$('#kcalAtividade').val(val.toFixed(2));
	}
	
	function insertActivity(){
		if(totalDiario+$("#duracaoAtividade").val()/60>24){
			$('#24Horas').popup("open");	
			return false;
		}
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(addActivity, errorCB, addActivitySucess);
	}
	
	function addActivitySucess(){
		/*$('#gridAtividades').append('<div class="ui-block-a"><div class="ui-bar ui-bar-c">'+ selectedatividade +'</div></div>                <div class="ui-block-b"><div class="ui-bar ui-bar-c">'+$("#duracaoAtividade").val()+'</div></div>                <div class="ui-block-c"><div class="ui-bar ui-bar-c">'+ $('#kcalAtividade').val() +'</div></div>');*/
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(loadActivity, errorCB);
		$('#atividadeSelecionada').html("Selecionar Atividade");
		$("#kcalAtividade").val("");
		$("#duracaoAtividade").val("");
	}
	
	function excluirAtividade(id){
		idAtividade = id;
		$('#excluirAtividades').popup("open");
	}
	
	function removeAtividade(){
		var db = window.openDatabase("Database", "1.0", "Gasto Calorico", 200000);
		db.transaction(removeActivity, errorCB, removeActivitySucess);		
	}