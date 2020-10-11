function start(){
	//
	//BOARD (CANVAS) INITIALISATION
	//
	board = document.getElementById("board");
	main = document.getElementById("Main");
	board.main = parent.innerWidth;
	board.main = parent.innerHeight;
	ctx = board.getContext("2d");
	//
	//PLOT ELEMENTS
	//
	plotGrid();
	plotBeacons();
	//
	//Start recurring Functions
	//
	startTime();
	update();
}
//
//Functions
//
// Grid Plot
function plotGrid(){
    for (a = 0; a < 500; a++){
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#004870";
        ctx.moveTo(a*6, 0);
        ctx.lineTo(a*6, 1000);
        ctx.stroke();
    }
    for (a = 0; a < 500; a+=2){
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.strokeStyle = "#004870";
        ctx.moveTo(0, a*4);
        ctx.lineTo(1600, a*4);
        ctx.stroke();
    }
}
// Beacons Plot
function plotBeacons(){
//Plot beacon 1
    ctx.strokeStyle = "#B89E40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(100,100,20,0,2*Math.PI);
    ctx.stroke();
//Plot beacon 2
    ctx.strokeStyle = "#B89E40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(960,690,20,0,2*Math.PI);
    ctx.stroke();
//Plot beacon 3
    ctx.strokeStyle = "#B89E40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(100,876,20,0,2*Math.PI);
    ctx.stroke();
}
//
//Convert Data & Plot Object
//
function ConvertAndPlot(OA0, OA1, OA2, OA3){
	extract = OA0 + ',' + OA1 + ',' + OA2 + ',' + OA3;
	rssi = extract.split(',');
	
	OA0_OA1 = (-rssi[1] - rssi[4])/2;
	OA0_OA2 = (-rssi[2] - rssi[8])/2;
	OA0_OA3 = (-rssi[3] - rssi[12])/2;

	PosFactor = 20;

	A = (OA0_OA1/PosFactor) * 271.3;
	B = (OA0_OA2/PosFactor) * 271.3;
	C = (OA0_OA3/PosFactor) * 271.3;

	prevY = (-757376 - A*A + C*C)/1552;
	prevX = (A*A - B*B + 1180*((-757376-A*A+C*C)/1552)+1377700)/1720;
	if(prevX<0){
		prevX = 0 - prevX;
	}
	if(prevY<0){
		prevY = 0 - prevY;
	}
	//redPos = kalmanFilter(prevX,prevY);
	predX = prevX;
	predY = prevY;
	POS = "Position of OBJ: <br> -X:" + predX + " <br>-Y: " + predY;
	document.getElementById("PosTab").innerHTML=POS;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#2288E2";
    ctx.beginPath();
	ctx.arc(predX,predY,20,0,2*Math.PI);
    ctx.stroke();
}

//
//Update -- Reccuring Function (100ms)
//
function update(){
	//BOARD (CANVAS) RETRIEVAL
	board = document.getElementById("board");
	ctx = board.getContext("2d");
	ctx.clearRect(0, 0, board.width, board.height);
	//PLOT ELEMENTS
	plotGrid();
	plotBeacons();
	//DATA GATHERING
	$.ajax({
		url: "./require/getData.php", 
		type: 'GET',
		success: function(Data) {
			RawData = Data.toString();
			//Prepare Data for extraction
			SepData = RawData.split(';<br>');
			//Split data for each beacons/receivers
			OA0 = (SepData[0] + '').split('//')[1];
			OA1 = (SepData[1] + '').split('//')[1];
			OA2 = (SepData[2] + '').split('//')[1];
			OA3 = (SepData[3] + '').split('//')[1];
			//Get the MAC addresses from the gathered Data
			OA0_Addr = SepData[0].split('//')[0].split('/')[1];
			OA1_Addr = SepData[1].split('//')[0].split('/')[1];
			OA2_Addr = SepData[2].split('//')[0].split('/')[1];
			OA3_Addr = SepData[3].split('//')[0].split('/')[1];
			//Convert the data in points & Plot the found elements
			PlotData = ConvertAndPlot(OA0, OA1, OA2, OA3);
			//Display the converted data in the info tab
			TEXT = 'OA0/' + OA0_Addr + ': <br>' + OA0 + '<br>' 
				+  'OA1/' + OA1_Addr + ': <br>' + OA1 + '<br>' 
				+  'OA2/' + OA2_Addr + ': <br>' + OA2 + '<br>' 
				+  'OA3/' + OA3_Addr + ': <br>' + OA3 + '<br>';
			document.getElementById("InfoTab").innerHTML=TEXT;
		}
	})
	
	//Restart program every 't' intervals
	var restartTime = setTimeout(update, 1000);
}


//Recurring Function (60 seconds)
function startTime() {
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours :12;
	var day = today.getDate();
	var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var weekday = days[today.getDay()];
	var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var month = months[today.getMonth()];
	var year = today.getFullYear();
	//Display time in hh:ss AM-PM format 
	document.getElementById('HoursMinutes').innerHTML = hours + ':' + minutes + ' ' + ampm; 
	//Display date in "Day #, Month Year"  format
	document.getElementById('DayMonth').innerHTML = weekday + ' ' + day + ', ' + month + ' ' + year;
	//Restart 60 seconds later
	var restartTime = setTimeout(startTime, 60000);
}
