	// Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateS_LOVPeito(tx) {
		tx.executeSql('DROP TABLE IF EXISTS S_LOV');
        tx.executeSql('CREATE TABLE IF NOT EXISTS S_LOV (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, value TEXT, high TEXT, low TEXT, created DATETIME, created_by TEXT, updated DATETIME, updated_by TEXT)');
        tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Supino Reto", "Peito", "", datetime("now"), "ADMIN")');
        tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Supino 45", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Supino Canadense", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Supino Alternado", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Supino Maquina", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Crucifixo Reto", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Crucifixo 45", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Voador", "Peito", "", datetime("now"), "ADMIN")');
		tx.executeSql('INSERT INTO S_LOV (type, value, high, low, created, created_by) VALUES ("EXERCICIO", "Cross Over", "Peito", "", datetime("now"), "ADMIN")');
    }

    // Query the database
    //
    function queryS_LOVPeito(tx, type) {
        tx.executeSql('SELECT * FROM S_LOV Where type = "EXERCICIO" And high = "Peito" ORDER BY value', [], querySuccessS_LOVPeito, errorCB);
    }

    // Query the success callback
    //
    function querySuccessS_LOVPeito(tx, results) {
        var len = results.rows.length;
		var innerHTMLPeito = "<option value='NULL' SELECTED>Exercício</option>";
        console.log("S_LOV table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Criado em =  " + results.rows.item(i).created);
			innerHTMLPeito = innerHTMLPeito +  "<option value='" + results.rows.item(i).id + "'>" + results.rows.item(i).value + "</option>"; 
        }
		document.getElementById("selectExercicioPeito").innerHTML = innerHTMLPeito;
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
        db.transaction(queryS_LOVPeito, errorCB);
    }

    // Cordova is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("PersonalPro", "1.0", "Personal Pro", 200000);
        db.transaction(populateS_LOVPeito, errorCB, successCB);
    }
	
	$('#peito' ).live( 'pageinit',function(event){
		$('#peito').live('swipeleft swiperight',function(event){
		        console.log("Evento - " + event.type);
		        if (event.type == "swipeleft") {
		            console.log("#costas");
		                $.mobile.changePage($("#costas"), { transition: "slidefade"});
		            }
		        if (event.type == "swiperight") {
		                console.log("#ombro");
		                $.mobile.changePage($("#ombro"), { transition: "slidefade"});
		            }
				event.preventDefault();
		    });
	});
	
	$('#costas' ).live( 'pageinit',function(event){
		$('#costas').live('swipeleft swiperight',function(event){
		        console.log("Evento - " + event.type);
		        if (event.type == "swipeleft") {
		            console.log("#perna");
		                $.mobile.changePage($("#perna"), { transition: "slidefade"});
		            }
		        if (event.type == "swiperight") {
		                console.log("#peito");
		                $.mobile.changePage($("#peito"), { transition: "slidefade"});
		            }
				event.preventDefault();
		    });
	});
	
	$('#perna' ).live( 'pageinit',function(event){
		$('#perna').live('swipeleft swiperight',function(event){
		        console.log("Evento - " + event.type);
		        if (event.type == "swipeleft") {
		            console.log("#abdominal");
		                $.mobile.changePage($("#abdominal"), { transition: "slidefade"});
		            }
		        if (event.type == "swiperight") {
		                console.log("#costas");
		                $.mobile.changePage($("#costas"), { transition: "slidefade"});
		            }
				event.preventDefault();
		    });
	});
	
	$('#abdominal' ).live( 'pageinit',function(event){
		$('#abdominal').live('swipeleft swiperight',function(event){
		        console.log("Evento - " + event.type);
		        if (event.type == "swipeleft") {
		            console.log("#ombro");
		                $.mobile.changePage($("#ombro"), { transition: "slidefade"});
		            }
		        if (event.type == "swiperight") {
		                console.log("#perna");
		                $.mobile.changePage($("#perna"), { transition: "slidefade"});
		            }
				event.preventDefault();
		    });
	});
	
	$('#ombro' ).live( 'pageinit',function(event){
		$('#ombro').live('swipeleft swiperight',function(event){
		        console.log("Evento - " + event.type);
		        if (event.type == "swipeleft") {
		            console.log("#peito");
		                $.mobile.changePage($("#peito"), { transition: "slidefade"});
		            }
		        if (event.type == "swiperight") {
		                console.log("#abdominal");
		                $.mobile.changePage($("#abdominal"), { transition: "slidefade"});
		            }
				event.preventDefault();
		    });
	});