	// Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {

    }
	
	// Query the database
    //
    function queryS_Aluno(tx, type) {
        tx.executeSql('SELECT * FROM S_ALUNO', [], querySuccessS_ALUNO, errorCB);
    }
	
	// Populate the database 
    //
    function createAluno(tx) {
		varNome = document.getElementById("txtName").value;
		varEmail = document.getElementById("txtEmail").value;
		varCelular = document.getElementById("txtCellphone").value;
		varNiver = document.getElementById("txtBirth").value;
        tx.executeSql('CREATE TABLE IF NOT EXISTS S_ALUNO (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, celular TEXT, niver TEXT, created DATETIME, created_by TEXT, updated DATETIME, updated_by TEXT)');
        tx.executeSql('INSERT INTO S_ALUNO (nome, email, celular, niver, created, created_by) VALUES ("' + varNome + '", "' + varEmail + '", "' + varCelular + '", "' + varNiver + '", datetime("now"), "ADMIN")');
    }
	
	// Query the success callback
    //
    function querySuccessS_ALUNO(tx, results) {
        var len = results.rows.length;
        alert("S_ALUNO table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            alert("Row = " + i + " ID = " + results.rows.item(i).id + " Criado em =  " + results.rows.item(i).created + " - Nome: " + results.rows.item(i).nome);
        }
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("PersonalPro", "1.0", "Personal Pro", 200000);
        db.transaction(queryS_Aluno, errorCB);
    }
	
	$(document).bind("mobileinit", function(){
		$.mobile.allowCrossDomainPages = true;
		$.support.cors = true;
		$.mobile.loadingMessage = "Carregando...";
		$.mobile.pageLoadErrorMessage = "Erro ao carregar a página...";
	});
	
	$( '#page' ).live( 'pageinit',function(event){
		$( '#btnSalvar' ).live( 'tap',function(event){
			alert( 'button clicked' );
			var db = window.openDatabase("PersonalPro", "1.0", "Personal Pro", 200000);
			db.transaction(createAluno, errorCB, successCB);
		});
	});